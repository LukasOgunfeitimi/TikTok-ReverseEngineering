const sign = require('./signer.js');

const UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36";

/**
 * Post comment to a video.
 * 
 * @param {*} videoURL The video url or a shared link
 * @param {*} text Comment text
 * @param {*} loginCookie Obtain this from your cookies: 'sid-guard'
 * @param {*} userAgent Optional: If you want a custom User Agent
 * @returns 
 */
async function PostComment(videoURL, text, loginCookie, userAgent = UserAgent, proxy = null) {
  let url = new URL(videoURL);
  if (!url.origin.includes("tiktok")) return new Error("Invalid URL: " + videoURL);
  let videoID = "";

  // If the video id isn't included, it could be a shared
  // link that's obtained from the mobile app.
  if (!url.pathname.includes("video")) {
    await fetch(videoURL).then(res=>{
      if (
        !res.redirected && 
        !res.url.includes("video")
      ) return new Error("Failed to get video ID. URL " + videoURL);
      url = new URL(res.url);
    });
  }

  const path = url.pathname.split('/');
  videoID = path[path.indexOf("video") + 1];
  if (!/\d{19}/.test(videoID)) return new Error("Invalid video ID " + videoID);

  const base = "https://www.tiktok.com/api/comment/publish/";
  const params = {
    "WebIdLastTime": "1744569282",
    "aid": "1988",
    "app_language": "en",
    "app_name": "tiktok_web",
    "aweme_id": videoID, // video id
    "browser_language": "en-GB",
    "browser_name": "Mozilla",
    "browser_online": "true",
    "browser_platform": "Win32",
    "browser_version": "5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F135.0.0.0%20Safari%2F537.36%20Edg%2F135.0.0.0",
    "channel": "tiktok_web",
    "cookie_enabled": "true",
    "data_collection_enabled": "true",
    "device_id": "7492868007388874262",
    "device_platform": "web_pc",
    "focus_state": "true",
    "from_page": "video",
    "history_len": "12",
    "is_fullscreen": "false",
    "is_page_visible": "true",
    "odinId": "6782224553520710661",
    "os": "windows",
    "priority_region": "GB",
    "referer": "",
    "region": "GB",
    "screen_height": "503",
    "screen_width": "894",
    "text": text,
    "text_extra": "%5B%5D",
    "tz_name": "Europe%2FLondon",
    "user_is_login": "true",
    "verifyFp": "verify_m9kyry09_pnQysBIY_wd0P_4s16_938m_H0mJA0njqxgq",
    "webcast_language": "en",
  }
  videoURL = base + "?" + new URLSearchParams(params).toString();
  return fetch(sign(videoURL, userAgent), {
    "headers": {
      "accept": "*//*",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      'accept-encoding': 'gzip, deflate, br, zstd',
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded",
      'content-length': '0',
      "pragma": "no-cache",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-secsdk-csrf-token": "DOWNGRADE",
      "cookie": loginCookie,
      "Referrer-Policy": "strict-origin-when-cross-origin",
      'User-Agent': userAgent,
    },
    "body": "",
    "method": "POST",
    agent: proxy
  }).then(res=>res.json());

}


(async()=> {
  const { comment, status_msg } = await PostComment(
    "https://www.tiktok.com/@famezygaming/video/7487160231240224022",
    "test test 123",
    "sid_guard=", // place your own
  );
  console.log(status_msg, comment?.cid, comment.aweme_id);

})()
