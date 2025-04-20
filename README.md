# TikTok VM Reverse Engineering (webmssdk.js)

This project is for reverse engineering the TikTok Virtual Machine (VM). 

## Overview

TikTok uses a custom virtual machine (VM) as part of its obfuscation and security layers. This project includes tools to:

- **Deobfuscate** `webmssdk.js` that has the virtual machine.
- **Decompile** TikTok’s virtual machine instructions into readable form.
- **Script Inject** Replace webmssdk.js with the deobfuscated VM [injector](./injector.js).
- **Sign URLs** Generate signed URLs which can be used to perform auth-based requests eg. Post comments.

---

## Deobfuscating

When looking at [webmssdk.js](./deobfVersions/raw.js) you're met with a
heavily obfuscated file. The main method of obfuscating Javascript
is to take advantage of bracket notation which let's you index a variable
using another variable.

So when you see something like this:

```js
// Line 3391 of ./deobfVersions/raw.js
r[Gb[301]](Gb[57], e))
```

You have absolutely no idea what it's indexing.

Each use of this method is using an array `Gb` defined as

```js
    var Gb = ["ydTGHdFNV", "sNxpGNHMrpLV", "xyrNMLEN Fpp rpMu", "ydWyNe", ...].map(function(a) {
        return a.split("").map(function(c) {
            return "LsfVNxutyOcrEMpYAGdFHneaUKRXSgoJDbhqICzPZklivTmWBwQj".indexOf(c) == -1 ? c : "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"["LsfVNxutyOcrEMpYAGdFHneaUKRXSgoJDbhqICzPZklivTmWBwQj".indexOf(c)]
        }).join("")
    });
```

As you can see we can't even read this either as it's all encoded 
using this string `"LsfVNxutyOcrEMpYAGdFHneaUKRXSgoJDbhqICzPZklivTmWBwQj"`.

Because this code get's executed immeditately we can simply take this snippet
and run it in any console and retrieve:

```js
[
    "isTrusted",
    "beforeunload",
    "filename too long",
    "isView",
    ...
]
```

We can now see each of these strings, therefore we can use RegEx to go through
the script and replace all uses of the array as seen [here](./deobfuscation/changeNotation.js)
It will also convert the bracket notation back to readable dot notation.

After that we've left with [webmssdk1](./deobfVersions/ems1.js).

The example from above now looks like this
```js
r.addEventListener("abort", e),
```

Much better.

Another significant obfuscation method used is for disgusing function calls.

Each function is defined in an array `Ab`.

```js
  var Ab = [function(e) {
      return "[object Array]" === Object.prototype.toString.call(e)
  }
  , function(e) {
      return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
  }
  , function() {
      var Ga;
      Ga = [0, 1],
      (je = !Ga[0],
      le && (setTimeout(function() {
          document.dispatchEvent(new Event(pe))
      }, Ga[1]),
      document.removeEventListener("DOMContentLoaded", Ab[40]),
      document.removeEventListener("readystatechange", Ab[75])))
  }
  ...]
```

And it used by calling `Ab[index](args)` like:

```js
Ab[31](f[e], t, n, i)
```

When using common IDE's if we click on this function it will just bring us to
the start of the array making it difficult to keep track of what function call
is calling what function.

We can make this readable by:

- Taking the array
- Replace each of the function element with it's own standard function calling it `function Abindex(args)`
- Replace each call to `Ab[index](args)` with `Abindex(args)`

We can do this by using the AST form of the script via bapel as seen [here](./deobfuscation/bapel.js#L55)

Which gives us [ems2](./deobfVersions/ems2.js)

When debugging the Virtual Machine later and seeing which function it uses
i was able to tell what it's doing and changed some of var names.

The Virtual Machine part of the script, specifically when executing the bytecode
is a massively nested if else statement as seen [here](./deobfVersions/ems2.js#L2235)

It is actually just a normal switch case but has been disguised pretty well. After manually
doing some of the cases, AI was able to help me out and do the rest. Which gave me [this](./handleBytecode.js), 
which looks pretty standard for a bytecode VM.

After all of this and a few more small obfuscation techniques
[here](./latestDeobf.js) is the latest version of the file.

---

## Decrypting Bytecode

With the file fully deobfuscated, figuring out the functionality was much easier,
I easily found how the VM was being initaited [here](./latestDeobf.js#L3041).

The bytecode is stored as a long string that's all been XOR'ed with a key that
lies within the string.

```js
// Line 3046 of latestDeobf.js
// Getting XOR key
for (var t = atob(payload), r = 0, n = 4; n < 8; ++n) r += t.charCodeAt(n);

// Decryping bytecode
unZip(Uint8Array.from(t.slice(8), XOR, r % 256), {  i: 2 }, t && t.out, t && t.dictionary),

// Extracting strings, functions and metadata for each function
for (var n = leb128(t), o = 0; o < n; ++o) strings.push(Ab27(t)); 
i = leb128(t);
for (o = 0; o < i; ++o) {
  for (var argsLength = leb128(t), isStrictMode = Boolean(leb128(t)), exceptionHandlers = new Array(), p = leb128(t), m = 0; m < p; ++m)    exceptionHandlers.push([leb128(t), leb128(t), leb128(t), leb128(t)]);
  for (var instructions = new Array(), h = leb128(t), v = 0; v < h; ++v) instructions.push(leb128(t));
  instructionSets.push([instructions, argsLength, isStrictMode, exceptionHandlers]);
}
```

NOTE: The string was gZip-ed and each value was leb128 encoded both for compression


---

## Virtual Machine decompiling

TikTok is using a full-fledged bytecode VM, if you browse through [it](vm.js) it supports
scopes, nested functions and exeception handling. This isn't a typical VM and shows that
it is definetly sophiscated.

To be able to write a form of decompilation I simply went through each of the cases 
and wrote appriopriate code for each one, and any case that jumps to another position 
for loops like this: 

```js
case 2:
    var a = instructions[index++];
    stack[pointer] ? --pointer : index += a;
    break;
```

I would simply stop it from doing so:
```js
case 2:
    var a = instructions[index++];
    //stack[pointer] ? --pointer : index += a;

    addCode(`// if (!v${pointer}) skip ${a} to ${index + a}`, byteCodePos)
    break;
```

After doing this for all the functions I dumped each file [here](./decompiler/functions/).
It's not completely readable but you should be able to make out a genereal idea
of what each function is doing, for example [VM223](./decompiler/functions/VM223.js) which is
generating random characters.

---

## Debugging

As this is a Javascript file executed on the web, it is actually possible to replace
the deobfuscated file with the normal `webmssdk.js` script and use TikTok normally.

This can be achieved by using two browser extensions known as [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en-GB) for executing
custom code and [CSP](https://chromewebstore.google.com/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden?hl=en-GB&pli=1) to disable CSP so I can fetch files from blocked origins. This is so I
can put `latestDeobf.js` in my own file and have it be fetched each time, this is so I can easily
edit the file and let the changes take effect each time I refresh. This makes it much easier to bebug
when reversing functions.

The script can be found [here](./injector.js)

---

## Requests

Now that we have deobfuscated the file and decompiled the VM we can 
start to reverse any function we want and figure out what it's doing.

When you make a request to the server it usually consists of 3 additional headers. 

| Header         |  Description |    
|----------------|-------------|                              
| `msToken`      |  Sent by the server and reissued on each request. |
| `X-Bogus`      |  Generated by webmssdk.js based on request. |
| `_signature`   |  Generated by webmssdk.js based on request. |

When making a request that doesn't require authentication like querying a user. Only `X-Bogus` is 
needed to be generated which can be done using `window.frontierSign`. `_signature` isn't needed
and any `msToken` can be used.

This popular [API](https://github.com/davidteather/TikTok-Api) let's you make those requests.
It uses a webdriver library called [playwright](https://playwright.dev/python/docs/api/class-playwright), which is also know as webdrives that simply set up
a browser instance, so it can easily call `window.frontierSign`.

When it comes to making authentication-based requests like posting a comment, `_signature` is needed
and isn't exposed to `window`.

---

## Signer

The inital function call for each request is [VM86](./decompiler/functions/VM86.js) which then calls

[VM113](./decompiler/functions/VM113.js) for `X-bogus`

[VM189](./decompiler/functions/VM189.js) for `_signature`


I was able to write [signer](./decompiler/signer.js) which
succesfully signs URL's.

Here's a demo of posting a comment and checking it using a 
private browser to ensure it's successful.

https://github.com/user-attachments/assets/746aa1a1-d171-487a-819b-5b0ca1894c47


NOTE: There are also some bot protection methods such as mouse tracking ([VM120](./decompiler/functions/VM120.js))
and environment checking ([VM265](./decompiler/functions/VM265.js)) within [VM86](./decompiler/functions/VM86.js), but it is a completely client-sided check and doesn't communicate
with the server about, so it can be ignored when generating the signatures.

---

## Extra info
- **Note:** The TikTok VM is constantly changing with new releases and this version is out of date. There's a high chance the main algorithms will change and decompilation of the new VM is needed.



