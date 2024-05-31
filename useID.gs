//*********************************** useID.gs ***********************************//
// 
// IDの受信や管理、IDに紐づけられた情報の抽出を行うプログラム
// 関数一覧
// 1.GetSpreadSheetID(sheet_num)
// 2.CheckUserID(user_id, json)
// 3.GetUserNum(user_id)
// 4.GetUserID(json)
// 5.SetUserID(json, sheet)
//
//********************************************************************************//



//----------スプレッドシート(DB)と接続する関数----------//
function GetSpreadSheetID(sheet_num) {
  let spreadsheet = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("SpreadSheet_id"));
  let sheet = spreadsheet.getSheetByName(sheet_num); 

  return sheet;
}

//----------ユーザIDがDBに存在するかを確認する関数----------//
function CheckUserID(user_id, json) {
  //DB呼び出し
  let sheet = GetSpreadSheetID('user_data');

  //n(DBの一番下の登録IDの行数)の取得
  let num = sheet.getRange('K2').getValue();

  //ID走査用のカウント
  let count = 1;

  //該当IDが見つかったら1になり、ループを抜け出す
  let id_flag = 0;

  //IDがあるかどうかを走査
  while(num >= count && id_flag == 0) {
    //count行目のIDと検索したいIDが一致
    if(sheet.getRange(count, 1).getValue() === user_id){
      id_flag = 1;
    }
    //一致しなかった
    else{
      count += 1;
    }

  }

  //IDがなかった場合
  if(id_flag == 0){
    SetUserID(json, sheet);
  }
  
}

//----------該当ユーザのDBの登録番号(スプレッドシートの行数)を取得する関数----------//
function GetUserNum(user_id) {

  //DB呼び出し
  let sheet = GetSpreadSheetID('user_data');

  //n(DBの一番下の登録IDの行数)の取得
  let num = sheet.getRange('K2').getValue();

  //ID走査用のカウント
  let count = 2;

  //該当IDが見つかったら1になり、ループを抜け出す
  let id_flag = 0;

  //獲得したいユーザIDの行数
  let user_id_num = 0;

  while(num >= count && id_flag == 0) {
    //count行目のIDと検索したいIDが一致
    if(sheet.getRange(count, 1).getValue() === user_id){
      user_id_num = count;
      id_flag = 1;
    }
    //一致しなかった
    else{
      count += 1;
    }
  }

  return user_id_num;
}

//----------LINEからユーザIDを取得する関数----------//
function GetUserID(json) {
  let user_id = json.events[0].source.userId;

  return user_id;
}

//----------ユーザIDをDBに格納する関数----------//
function SetUserID(json, sheet) {

  //user_idの獲得
  let user_id = GetUserID(json);

  //現在の最新ユーザIDの格納場所の呼び出し
  let num = sheet.getRange('K2').getValue();

  //1個下のセル(今回のユーザのID格納場所)に移動
  num += 1;

  //IDを指定のセルに格納
  sheet.getRange(num, 1).setValue(user_id);

  //フラグをすべて0に
  for(let i=2; i<=10; i++){
    sheet.getRange(num, i).setValue(0);
  }

  //DBのnの値の更新
  sheet.getRange('K2').setValue(num);
}