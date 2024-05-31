//*********************************** command_func.gs ***********************************//
//
// command.gsからの指示に従って特殊処理やテンプレート処理を行うプログラム
// 関数一覧
// 1.Reset(token, text, json)
// 2.CheckKeyword(token, json, mainflag)
// 3.CheckClock(token, mainflag)
// 4.CheckAtoC(token, text, mainflag)
// 5.FormLink(token)
// 6.Temp1(token, count, sheet)
// 7.Temp2(token, count, sheet)
// 8.Temp3(token, count, sheet)
// 9.Temp4(token, count, sheet)
// 10.Temp5(token, count, sheet)
// 11.Temp6(token, count, sheet)
// 12.Temp7(token, count, sheet)
// 13.Temp8(token, count, sheet)
// 14.Temp9(token, count, sheet)
// 15.Temp10(token, count, sheet)
// 16.Temp11(token, count, sheet)
//
//***************************************************************************************//



//----------リセット用関数----------//
function Reset(token, text, json)
{
  let postData;
  
  //リセット確認
  if(text === 'リセット'){
    postData = {
      "replyToken" : token,
      "messages" : [
        {
          'type':'text',
          'text': 'これまでの進行が保存されず消えるため、もう一度初めから謎解きを行うことになります。',
        },
        {
          'type':'text',
          'text': '以上をご了承していただける方は〔私はリセットを行います〕と入力してください。',
        }
      ]
    };
  }
  //リセット実行
  else if(text === '私はリセットを行います'){
    postData = {
      "replyToken" : token,
      "messages" : [
        {
          'type':'text',
          'text': '進行がリセットされました。もう一度遊ぶ場合は「スタート」と入力してください。',
        }
      ]
    };
    ResetFlag(json);
  }
  
  return postData;

}



//----------キーワード確認の際のフラグ確認の関数----------//
function CheckKeyword(token, json, mainflag){

  let sheet_user = GetSpreadSheetID('user_data');

  let sheet_key = GetSpreadSheetID('keyword');

  let user_id_num = GetUserNum(GetUserID(json));

  let keyword_num;

  let postData;

  //メインフラグ0
  if(mainflag == 0){
    keyword_num = 2;
  }
  //メインフラグ1
  if(mainflag == 1){
    keyword_num = 10;
  }
  //メインフラグ2
  else if(mainflag == 2){

    let a = sheet_user.getRange(user_id_num, 3).getValue();
    let b = sheet_user.getRange(user_id_num, 4).getValue();
    let c = sheet_user.getRange(user_id_num, 5).getValue();

    if(a == 0 && b == 0 && c == 0){
      keyword_num = 3;
    }
    else if(a == 1 && b == 0 && c == 0){
      keyword_num = 4;
    }
    else if(a == 0 && b == 1 && c == 0){
      keyword_num = 5;
    }
    else if(a == 0 && b == 0 && c == 1){
      keyword_num = 6;
    }
    else if(a == 1 && b == 1 && c == 0){
      keyword_num = 7;
    }
    else if(a == 1 && b == 0 && c == 1){
      keyword_num = 8;
    }
    else if(a == 0 && b == 1 && c == 1){
      keyword_num = 9;
    }
  }
  //メインフラグ3
  if(mainflag == 3){
    keyword_num = 11;
  }
  //メインフラグ4
  if(mainflag == 4){
    keyword_num = 12;
  }
  //メインフラグ5
  if(mainflag == 5){
    keyword_num = 13;
  }
  //メインフラグ6
  if(mainflag == 6){
    keyword_num = 14;
  }

  postData = {
    "replyToken" : token,
    "messages" : [
      {
        'type':'text',
        'text': '現在使用できるキーワードは以下の通りです。',
      },
      {
        'type':'text',
        'text': sheet_key.getRange(keyword_num, 6).getValue(),
      }
    ]
  };

  return postData;

}

//----------懐中時計確認用関数----------//
function CheckClock(token, mainflag){

  let sheet = GetSpreadSheetID('keyword');

  let postData;

  let keyword_num;

  //メインフラグ0~1
  if(mainflag == 0 || mainflag == 1){
    keyword_num = 15;
  }
  //メインフラグ2~4
  else if(mainflag == 2 || mainflag == 3 || mainflag == 4){
    keyword_num = 17;
  }
  //メインフラグ5~6
  else if(mainflag == 5 || mainflag == 6){
    keyword_num = 20;
  }

  postData = {
    "replyToken" : token,
    "messages" : [
      {
        'type':'image',
        "originalContentUrl":sheet.getRange(keyword_num, 5).getValue(),
        "previewImageUrl":sheet.getRange(keyword_num, 5).getValue(),
      },
      {
        'type':'text',
        'text': '手元の時計の文字盤を確認すると、このようになっていた。',
      }
    ]
  };

  return postData;

}

//----------フラグa~c発生イベントの分岐処理関数----------//
function CheckAtoC(token, text, mainflag){

  let sheet = GetSpreadSheetID('keyword');

  let atocflag = 0;

  let postData;

  //シート中の必要なキーワードの行数
  let keyword_num;

  //メインフラグ2~4
  if(mainflag == 2 || mainflag == 3 || mainflag == 4){
    if(text === '懐中時計の針を06:27に合わせる'){
      keyword_num = 22;
      atocflag = 1;
    }
    else if(text === '懐中時計の針を09:06に合わせる'){
      keyword_num = 27;
      atocflag = 1;
    }
    else if(text === '懐中時計の針を12:18に合わせる'){
      keyword_num = 32;
      atocflag = 1;
    }
  }
  //メインフラグ5~6
  else if(mainflag == 5 || mainflag == 6){
    if(text === '懐中時計の針を06:27に合わせる'){
      keyword_num = 25;
      atocflag = 1;
    }
    else if(text === '懐中時計の針を09:06に合わせる'){
      keyword_num = 30;
      atocflag = 1;
    }
    else if(text === '懐中時計の針を12:18に合わせる'){
      keyword_num = 35;
      atocflag = 1;
    }
  }

  if(atocflag == 1){
    postData = {
      "replyToken" : token,
      "messages" : [
       {
          'type':'image',
          "originalContentUrl":sheet.getRange(keyword_num, 5).getValue(),
          "previewImageUrl":sheet.getRange(keyword_num, 5).getValue(),
        },
        {
          'type':'image',
          "originalContentUrl":sheet.getRange(keyword_num, 6).getValue(),
          "previewImageUrl":sheet.getRange(keyword_num, 6).getValue(),
        },
        {
          'type':'image',
          "originalContentUrl":sheet.getRange(keyword_num, 7).getValue(),
          "previewImageUrl":sheet.getRange(keyword_num, 7).getValue(),
        },
        {
          'type':'image',
          "originalContentUrl":sheet.getRange(keyword_num, 8).getValue(),
          "previewImageUrl":sheet.getRange(keyword_num, 8).getValue(),
        },
        {
          'type':'image',
          "originalContentUrl":sheet.getRange(keyword_num, 9).getValue(),
          "previewImageUrl":sheet.getRange(keyword_num, 9).getValue(),
        },
      ]
    };
  }
  else{
    postData = {
      "replyToken" : token,
      "messages" : [
        {
          'type':'text',
          'text': '特に何も起こらない。',
        }
      ]
    };
  }

  return postData;

}

//----------フラグd~h発生イベントの分岐処理関数----------//
function CheckDtoH(token, json, mainflag){

  let postData;

  //DB呼び出し
  let sheet = GetSpreadSheetID('user_data');

  //該当ユーザIDの行を入手
  let user_id_num = GetUserNum(GetUserID(json));

  let dtohflag = 0;

  let d = sheet.getRange(user_id_num, 6).getValue();
  let e = sheet.getRange(user_id_num, 7).getValue();
  let f = sheet.getRange(user_id_num, 8).getValue();
  let g = sheet.getRange(user_id_num, 9).getValue();
  let h = sheet.getRange(user_id_num, 10).getValue();

  if(mainflag == 3){
    //d,e,f,g,hすべてフラグ1
    if(d == 1 && e == 1 && f == 1 && g == 1 && h == 1){
      postData = {
        "replyToken" : token,
        "messages" : [
          {
            'type':'image',
            "originalContentUrl":'https://drive.google.com/uc?id=16t3gkLvFoppUGIqW3IqWWpdNkUxwGkFk',
            "previewImageUrl":'https://drive.google.com/uc?id=16t3gkLvFoppUGIqW3IqWWpdNkUxwGkFk',
          },
          {
            'type':'image',
            "originalContentUrl":'https://drive.google.com/uc?id=1GFlQLZUjPkEvI7pRKA-Asblfplma23cn',
            "previewImageUrl":'https://drive.google.com/uc?id=1GFlQLZUjPkEvI7pRKA-Asblfplma23cn',
          },
          {
            'type':'image',
            "originalContentUrl":'https://drive.google.com/uc?id=1ymHguzu9xaHKXKP8zsidaQMq3Hx6zYVl',
            "previewImageUrl":'https://drive.google.com/uc?id=1ymHguzu9xaHKXKP8zsidaQMq3Hx6zYVl',
          },
          {
            'type':'image',
            "originalContentUrl":'https://drive.google.com/uc?id=1DEq3PRNI1skfUzMS9XzRltgJgZRp3wGU',
            "previewImageUrl":'https://drive.google.com/uc?id=1DEq3PRNI1skfUzMS9XzRltgJgZRp3wGU',
          },
          {
            'type':'text',
            'text': '確認し終わったら〔st3〕と入力してください。※〔〕は除いて入力してください。',
          }
        ]
      };
      sheet.getRange(user_id_num, 2).setValue(4);
      dtohflag = 1;
    }
  }

  if(dtohflag == 0){
    if(mainflag >= 4){
      postData = {
        "replyToken" : token,
        "messages" : [
          {
            'type':'image',
            "originalContentUrl":'https://drive.google.com/uc?id=16t3gkLvFoppUGIqW3IqWWpdNkUxwGkFk',
            "previewImageUrl":'https://drive.google.com/uc?id=16t3gkLvFoppUGIqW3IqWWpdNkUxwGkFk',
          },
          {
            'type':'image',
            "originalContentUrl":'https://drive.google.com/uc?id=1GFlQLZUjPkEvI7pRKA-Asblfplma23cn',
            "previewImageUrl":'https://drive.google.com/uc?id=1GFlQLZUjPkEvI7pRKA-Asblfplma23cn',
          },
          {
            'type':'image',
            "originalContentUrl":'https://drive.google.com/uc?id=1ymHguzu9xaHKXKP8zsidaQMq3Hx6zYVl',
            "previewImageUrl":'https://drive.google.com/uc?id=1ymHguzu9xaHKXKP8zsidaQMq3Hx6zYVl',
          },
          {
            'type':'image',
            "originalContentUrl":'https://drive.google.com/uc?id=1DEq3PRNI1skfUzMS9XzRltgJgZRp3wGU',
            "previewImageUrl":'https://drive.google.com/uc?id=1DEq3PRNI1skfUzMS9XzRltgJgZRp3wGU',
          },
          {
            'type':'text',
            'text': '既に以上のような情報が公開されています。',
          }
        ]
      };
    }
    else{
      postData = {
        "replyToken" : token,
        "messages" : [
          {
            'type':'text',
            'text': '対応するコマンドがありませんでした。コマンドが本当に正しいか確認してください。すべての謎に正解したかも確認してください。',
          },
          {
            'type':'text',
            'text': '※解答は「」をつけて入力してください。',
          }
        ]
      };
    }
  }

  return postData;

}



//----------お問い合わせフォーム用関数----------//
function FormLink(token){
  postData = {
      "replyToken" : token,
      "messages" : [
        {
          'type':'text',
          'text': 'お手数ですが、以下のリンクからお問い合わせをしてください。',
        },
        {
          'type':'text',
          'text': 'https://docs.google.com/forms/d/e/1FAIpQLScGhxGsx3FYGmF3oo8qLvElnVVvjoxSYGXxUVd6j2BZ8ApTkw/viewform',
        },
        {
          'type':'text',
          'text': '不具合の修正・更新履歴は下記リンクより確認できます。',
        },
        {
          'type':'text',
          'text': 'https://x.com/Loup_Garou_ynu/status/1792752170351398956',
        }
      ]
    };

    return postData;

}



//----------テンプレート1処理用関数----------//
function Temp1(token, count, sheet){

  let postData;

  //テキスト
  postData = {
    "replyToken" : token,
    "messages" : [
      {
        'type':'text',
        'text': sheet.getRange(count, 6).getValue(),
      }
    ]
  };

  return postData;

}

//----------テンプレート2処理用関数----------//
function Temp2(token, count, sheet){

  let postData;

  //画像・テキスト
  postData = {
    "replyToken" : token,
    "messages" : [
      {
        'type':'image',
        "originalContentUrl":sheet.getRange(count, 6).getValue(),
        "previewImageUrl":sheet.getRange(count, 6).getValue(),
      },
      {
        'type':'text',
        'text': sheet.getRange(count, 7).getValue(),
      }
    ]
  };

  return postData;

}

//----------テンプレート3処理用関数----------//
function Temp3(token, count, sheet){

  let postData;

  //画像・テキスト・画像・テキスト
  postData = {
    "replyToken" : token,
    "messages" : [
      {
        'type':'image',
        "originalContentUrl":sheet.getRange(count, 6).getValue(),
        "previewImageUrl":sheet.getRange(count, 6).getValue(),
      },
      {
         'type':'text',
         'text': sheet.getRange(count, 7).getValue(),
      },
      {
        'type':'image',
        "originalContentUrl":sheet.getRange(count, 8).getValue(),
        "previewImageUrl":sheet.getRange(count, 8).getValue(),
      },
      {
        'type':'text',
        'text': sheet.getRange(count, 9).getValue(),
      }
    ]
  };

  return postData;

}

//----------テンプレート4処理用関数----------//
function Temp4(token, count, sheet){

  let postData;

  //画像・画像・画像・画像・画像
  postData = {
    "replyToken" : token,
    "messages" : [
       {
        'type':'image',
        "originalContentUrl":sheet.getRange(count, 6).getValue(),
        "previewImageUrl":sheet.getRange(count, 6).getValue(),
      },
      {
        'type':'image',
        "originalContentUrl":sheet.getRange(count, 7).getValue(),
        "previewImageUrl":sheet.getRange(count, 7).getValue(),
      },
      {
        'type':'image',
        "originalContentUrl":sheet.getRange(count, 8).getValue(),
        "previewImageUrl":sheet.getRange(count, 8).getValue(),
      },
      {
        'type':'image',
        "originalContentUrl":sheet.getRange(count, 9).getValue(),
        "previewImageUrl":sheet.getRange(count, 9).getValue(),
      },
      {
        'type':'image',
        "originalContentUrl":sheet.getRange(count, 10).getValue(),
        "previewImageUrl":sheet.getRange(count, 10).getValue(),
      }
    ]
  };

  return postData;
  
}

//----------テンプレート5処理用関数----------//
function Temp5(token, count, sheet){

  let postData;

  //動画・テキスト
  postData = {
    "replyToken" : token,
    "messages" : [
      {
        'type':'video',
        "originalContentUrl":sheet.getRange(count, 6).getValue(),
        "previewImageUrl":sheet.getRange(count, 6).getValue(),
      },
      {
        'type':'text',
        'text': sheet.getRange(count, 7).getValue(),
      }
    ]
  };

  return postData;

}

//----------テンプレート6処理用関数----------//
function Temp6(token, count, sheet){

  let postData;

  //画像・テキスト・画像・テキスト
  postData = {
    "replyToken" : token,
    "messages" : [
      {
        'type':'image',
        "originalContentUrl":sheet.getRange(count, 6).getValue(),
        "previewImageUrl":sheet.getRange(count, 6).getValue(),
      },
      {
        'type':'image',
        "originalContentUrl":sheet.getRange(count, 7).getValue(),
        "previewImageUrl":sheet.getRange(count, 7).getValue(),
      },
      {
        'type':'image',
        "originalContentUrl":sheet.getRange(count, 8).getValue(),
        "previewImageUrl":sheet.getRange(count, 8).getValue(),
      },
      {
        'type':'text',
        'text': sheet.getRange(count, 9).getValue(),
      }
    ]
  };

  return postData;

}

//----------テンプレート7処理用関数----------//
function Temp7(token, count, sheet){

  let postData;

  //テキスト・テキスト
  postData = {
    "replyToken" : token,
    "messages" : [
      {
        'type':'text',
        'text': sheet.getRange(count, 6).getValue(),
      },
      {
        'type':'text',
        'text': sheet.getRange(count, 7).getValue(),
      }
    ]
  };

  return postData;

}

//----------テンプレート8処理用関数----------//
function Temp8(token, count, sheet){

  let postData;

  //画像・画像・テキスト
  postData = {
    "replyToken" : token,
    "messages" : [
      {
        'type':'image',
        "originalContentUrl":sheet.getRange(count, 6).getValue(),
        "previewImageUrl":sheet.getRange(count, 6).getValue(),
      },
      {
        'type':'image',
        "originalContentUrl":sheet.getRange(count, 7).getValue(),
        "previewImageUrl":sheet.getRange(count, 7).getValue(),
      },
      {
        'type':'text',
        'text': sheet.getRange(count, 8).getValue(),
      }
      
    ]
  };

  return postData;

}

//----------テンプレート9処理用関数----------//
function Temp9(token, count, sheet){

  let postData;

  //画像
  postData = {
    "replyToken" : token,
    "messages" : [
      {
        'type':'image',
        "originalContentUrl":sheet.getRange(count, 6).getValue(),
        "previewImageUrl":sheet.getRange(count, 6).getValue(),
      }
    ]
  };

  return postData;

}

//----------テンプレート10処理用関数----------//
function Temp10(token, count, sheet){

  let postData;

  //画像・テキスト・テキスト
  postData = {
    "replyToken" : token,
    "messages" : [
      {
        'type':'image',
        "originalContentUrl":sheet.getRange(count, 6).getValue(),
        "previewImageUrl":sheet.getRange(count, 6).getValue(),
      },
      {
        'type':'text',
        'text': sheet.getRange(count, 7).getValue(),
      },
      {
        'type':'text',
        'text': sheet.getRange(count, 8).getValue(),
      }
      
    ]
  };

  return postData;

}

//----------テンプレート11処理用関数----------//
function Temp11(token, count, sheet){

  let postData;

  //画像・画像・画像・画像・テキスト
  postData = {
    "replyToken" : token,
    "messages" : [
       {
        'type':'image',
        "originalContentUrl":sheet.getRange(count, 6).getValue(),
        "previewImageUrl":sheet.getRange(count, 6).getValue(),
      },
      {
        'type':'image',
        "originalContentUrl":sheet.getRange(count, 7).getValue(),
        "previewImageUrl":sheet.getRange(count, 7).getValue(),
      },
      {
        'type':'image',
        "originalContentUrl":sheet.getRange(count, 8).getValue(),
        "previewImageUrl":sheet.getRange(count, 8).getValue(),
      },
      {
        'type':'image',
        "originalContentUrl":sheet.getRange(count, 9).getValue(),
        "previewImageUrl":sheet.getRange(count, 9).getValue(),
      },
      {
        'type':'text',
        'text': sheet.getRange(count, 10).getValue(),
      }
    ]
  };

  return postData;
  
}