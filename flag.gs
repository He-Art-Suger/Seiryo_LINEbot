//*********************************** flag.gs ***********************************//
// 
// フラグ呼び出しや更新、関数の紐づけを行うプログラム
// 関数一覧
// 1.LoadMainFlag(user_id_num)
// 2.MainFlag(token, text, json)
// 3.ResetFlag(json)
// 4.CheckFlag(text, json, mainflag)
//
//*******************************************************************************//



//----------該当ユーザのメインフラグ(MF)を取得する関数----------//
function LoadMainFlag(user_id_num) {
  let sheet = GetSpreadSheetID('user_data');
  let user_id_flag = sheet.getRange(user_id_num, 2).getValue();

  if (!user_id_flag) return 0;

  return parseInt(user_id_flag, 10);
}

//----------メインフラグの値に応じて使用可能コマンドの分岐を行う関数----------//　今後逐次追加
function MainFlag(token, text, json) {

  let postData;

  //該当ユーザのフラグの読み込み
  let mainflag = LoadMainFlag(GetUserNum(GetUserID(json)));

  //**********試運転**********//
  //postData = Command(token, text, json, mainflag, 'practiceALL');

  //**********本実装時**********//
  //フラグに応じてアクセスするファイルを変える
  
  //フラグ0
  if(mainflag == 0){
    postData = Command(token, text, json, mainflag, 'commandF0');
  }
  //フラグ1
  else if(mainflag == 1){
    postData = Command(token, text, json, mainflag, 'commandF1');
  }
  //フラグ2
  else if(mainflag == 2){
    postData = Command(token, text, json, mainflag, 'commandF2');
  }
  //フラグ3
  else if(mainflag == 3){
    postData = Command(token, text, json, mainflag, 'commandF3');
  }
  //フラグ4
  else if(mainflag == 4){
    postData = Command(token, text, json, mainflag, 'commandF4');
  }
  //フラグ5
  else if(mainflag == 5){
    postData = Command(token, text, json, mainflag, 'commandF5');
  }
  //フラグ6
  else if(mainflag == 6){
    postData = Command(token, text, json, mainflag, 'commandF6');
  }
  
  return postData;

}

//----------フラグのリセットを行う関数----------//
function ResetFlag(json){

  //DB呼び出し
  let sheet = GetSpreadSheetID('user_data');

  //該当ユーザIDの行を入手
  let user_id_num = GetUserNum(GetUserID(json));

  //フラグをすべて0に
  for(let i=2; i<=10; i++){
    sheet.getRange(user_id_num, i).setValue(0);
  }

}

//----------フラグの確認と更新をする関数----------//
function CheckFlag(text, json, mainflag){

  let sheet = GetSpreadSheetID('user_data');

  let user_id_num = GetUserNum(GetUserID(json));

  //メインフラグ0
  if(mainflag == 0){
    if(text === '自室の本棚を調べる'){
      //MF=1に
      sheet.getRange(user_id_num, 2).setValue(1);
    }
  }
  //メインフラグ1
  if(mainflag == 1){
    if(text === '「062709061218」'){
      //MF=2に
      sheet.getRange(user_id_num, 2).setValue(2);
    }
  }
  //メインフラグ2
  else if(mainflag == 2){
    if(text === '懐中時計の針を09:06に合わせる'){
      //a=1に
      sheet.getRange(user_id_num, 3).setValue(1);
    }
    else if(text === '懐中時計の針を12:18に合わせる'){
      //b=1に
      sheet.getRange(user_id_num, 4).setValue(1);
    }
    else if(text === '懐中時計の針を06:27に合わせる'){
      //c=1に
      sheet.getRange(user_id_num, 5).setValue(1);
    }
    let a = sheet.getRange(user_id_num, 3).getValue();
    let b = sheet.getRange(user_id_num, 4).getValue();
    let c = sheet.getRange(user_id_num, 5).getValue();
    //a,b,cすべてフラグ1
    if(a == 1 && b == 1 && c == 1){
      //MF=3に
      sheet.getRange(user_id_num, 2).setValue(3);
    }
  }
  //メインフラグ3
  else if(mainflag == 3){
    if(text === '「ダイヤ」'){
      //d=1に
      sheet.getRange(user_id_num, 6).setValue(1);
    }
    else if(text === '「テブクロ」'){
      //e=1に
      sheet.getRange(user_id_num, 7).setValue(1);
    }
    else if(text === '「ココロ」'){
      //f=1に
      sheet.getRange(user_id_num, 8).setValue(1);
    }
    else if(text === '「ハネ」'){
      //g=1に
      sheet.getRange(user_id_num, 9).setValue(1);
    }
    else if(text === '「ペン」'){
      //h=1に
      sheet.getRange(user_id_num, 10).setValue(1);
    }
  }
  //メインフラグ4
  else if(mainflag == 4){
    if(text === '「ほうぎょく座」\n「はねペン座」'){
      //MF=5に
      sheet.getRange(user_id_num, 2).setValue(5);
    }
  }
  //メインフラグ5
  else if(mainflag == 5){
    if(text === 'CLEAR！'){
      //MF=6に
      sheet.getRange(user_id_num, 2).setValue(6);
    }
  }

}