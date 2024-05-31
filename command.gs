//*********************************** command.gs ***********************************//
//
// command.gs:コマンドを受信し、オブジェクト送信やフラグ管理に接続するプログラム
// 関数一覧
// 1.Command(token, text, json, mainflag, sheet_num)
//
//**********************************************************************************//



//----------コマンド処理の基盤となる関数----------//
function Command(token, text, json, mainflag, sheet_num) {

  let postData;

  //スプレッドシート(DB)に接続
  let sheet = GetSpreadSheetID(sheet_num);

  //クエリ受け取り用変数
  let query;

  //対応コマンドがあるかのフラグ
  let query_flag = 0;

  //コマンド表の行数取得
  let query_num = sheet.getRange('K2').getValue();

  //行数カウント
  let count = 2;

  //**********特殊処理判定**********//
  //リセット判定
  if(text === 'リセット' || text === '私はリセットを行います'){
    postData = Reset(token, text, json);
    query_flag = 1;
  }
  //キーワード確認
  else if(text === '現在のキーワードを確認する'){
    postData = CheckKeyword(token, json, mainflag);
    query_flag = 1;
  }
  //懐中時計確認
  else if(text === '懐中時計の文字盤を調べる'){
    postData = CheckClock(token, mainflag);
    query_flag = 1;
  }
  //フラグa~c用分岐
  else if(text === '懐中時計の針を06:27に合わせる' || text === '懐中時計の針を09:06に合わせる' || text === '懐中時計の針を12:18に合わせる'){
    postData = CheckAtoC(token, text, mainflag);
    CheckFlag(text, json, mainflag);
    query_flag = 1;
  }
  //フラグd~h用分岐
  else if(text === '謎の答えを導いた'){
    postData = CheckDtoH(token, json, mainflag);
    query_flag = 1;

  }
  //お問い合わせフォーム
  else if(text === 'お問い合わせ'){
    postData = FormLink(token);
    query_flag = 1;
  }

  //**********通常処理判定**********//
  while(count <= query_num && query_flag == 0){
    query = sheet.getRange(count, 2).getValue();

    //クエリがコマンド表のコマンドと一致
    if(text === query){
      //テンプレートタイプの判定
      //テンプレート1
      if(sheet.getRange(count, 3).getValue() == 1){
        postData = Temp1(token, count, sheet);
      }
      //テンプレート2
      else if(sheet.getRange(count, 3).getValue() == 2){
        postData = Temp2(token, count, sheet);
      }
      //テンプレート3
      else if(sheet.getRange(count, 3).getValue() == 3){
        postData = Temp3(token, count, sheet);
      }
      //テンプレート4
      else if(sheet.getRange(count, 3).getValue() == 4){
        postData = Temp4(token, count, sheet);
      }
      //テンプレート5
      else if(sheet.getRange(count, 3).getValue() == 5){
        postData = Temp5(token, count, sheet);
      }
      //テンプレート6
      else if(sheet.getRange(count, 3).getValue() == 6){
        postData = Temp6(token, count, sheet);
      }
      //テンプレート7
      else if(sheet.getRange(count, 3).getValue() == 7){
        postData = Temp7(token, count, sheet);
      }
      //テンプレート8
      else if(sheet.getRange(count, 3).getValue() == 8){
        postData = Temp8(token, count, sheet);
      }
      //テンプレート9
      else if(sheet.getRange(count, 3).getValue() == 9){
        postData = Temp9(token, count, sheet);
      }
      //テンプレート10
      else if(sheet.getRange(count, 3).getValue() == 10){
        postData = Temp10(token, count, sheet);
      }
      //テンプレート11
      else if(sheet.getRange(count, 3).getValue() == 11){
        postData = Temp11(token, count, sheet);
      }

      query_flag = 1;

      CheckFlag(text, json, mainflag);

    }

    count += 1;

  }

  //クエリが一致しなかった場合
  if(query_flag == 0)
  {
    postData = {
      "replyToken" : token,
      "messages" : [
        {
          'type':'text',
          'text': '対応するコマンドがありませんでした。コマンドが本当に正しいか確認してください。',
        },
        {
          'type':'text',
          'text': '※解答は「」をつけて入力してください。',
        }
      ]
    };
  }

  return postData;

}