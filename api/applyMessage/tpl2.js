export const tpl = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      .tpl {
        position: relative;
        margin: auto;
        width: 600px;
        height: 800px;
        border: 1px solid red;
      }

      .title {
        margin-top: 50px;
        font-size: 24px;
        font-weight: 400;
        text-align: center;
      }

      .organ {
        margin: 10px;
        text-align: center;
      }

      .call {
        margin: 10px;
      }

      .text { 
        margin: 10px;
        text-indent: 2em;
      }

      .seal-box {
        float: right;
        position: relative;
        margin-top: 50px;
        margin-right: 30px;
        width: 200px;
        height: 200px;
        border: 1px solid red;
      }

      .seal-box img {
        width: 200px;
      }


      .sealDate {
        position: absolute;
        bottom: 20px;
        width: 100%;
        text-align: center;
      }
    </style>
</head>
<body style="font-family: SimSun;">
  <div class="tpl">
    <div class="title">{{ departtName }}</div>
    <div class="organ">(泰行审食生)受字〔{{ acceptYear }}〕第{{ templateNo }}号</div>
    <div class="call">{{ adminName }}</div>
    <div class="text">你（单位）提出 {{ applyMessage }} 的食品生产许可申请和所提供（出示）的材料，符合食品生产许可申请条件。根据《中华人民共和国行政许可法》第三十二条第一款第（五）项规定，决定予以受理。'</div>
    <div class="seal-box">
      <div class="seal">
        <img src="{{ seal }}" alt="签章" />
      </div>
      <div class="sealDate">{{ sealDate }}</div>
    </div>
  </div>

  <script>
    const tpl = document.getElementsByClassName('tpl')[0],
          sealBox = document.getElementsByClassName('seal-box')[0],
          tplHeight = parseInt(getComputedStyle(tpl, null)['height']),
          { offsetLeft, offsetTop } = sealBox;
        
    const position = {
      x: offsetLeft,
      y: tplHeight - offsetTop
    };

    console.log(position);

  </script>
</body>
</html>`;