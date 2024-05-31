//*********************************** main.gs ***********************************//
// 
// LINE APIからの情報を送受信する最もユーザ側のプログラム
// 関数一覧
// 1.doPost(e)
// 2.reply(token, text, json)
//
//*******************************************************************************//


//----------LINE APIの情報を管理する関数----------//
function doPost(e) {
  // LINE APIから渡されてきた情報を抽出
  const contents = e.postData.contents;

  // JSON変換
  const json = JSON.parse(contents);
  // event抽出
  const event = json.events[0];
  // 送信されたテキスト
  const text = event.message.text;
  // 返信用トークン
  const token = event.replyToken;
  
  // 返信用の関数
  reply(token, text, json);
}

//----------返信用の関数----------//
function reply(token, text, json) {
  // LINE Developersで発行したトークン
  //const LINE_TOKEN = PropertiesService.getScriptProperties().getProperty("LINE_TOKEN");
  const LINE_TOKEN_OFFICIAL = PropertiesService.getScriptProperties().getProperty("LINE_TOKEN_OFFICIAL");
  // APIのURL
  const url = "https://api.line.me/v2/bot/message/reply";
  // 送信データのヘッダー
  let headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + LINE_TOKEN_OFFICIAL,
  };

  //********************main.gsについて、加工するのはこの部分から********************//

  //ユーザIDが存在するかを確認し、なければDBに追加
  CheckUserID(GetUserID(json), json);

  // 送信データの中身(これをLINEが処理してくれる)
  const postData = MainFlag(token, text, json);

  //**********************************ここまで***********************************//

  // それぞれをURLに乗せるために固める
  let options = {
    "method" : "post",
    "headers" : headers,
    "payload" : JSON.stringify(postData)
  };
 // 送信！
  return UrlFetchApp.fetch(url, options);  
}