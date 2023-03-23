const cheerio = require('cheerio');
const request = require('request');

const fs = require('fs');

const dataFilePath = 'data.txt';
require('dotenv').config();

const {senderMail}=require('./Services/mailService');

const cron = require('node-cron');
const { send } = require('process');
const url=''
cron.schedule('0 */1 * * * *', () => {
  console.log('Cron job is running...');
  request(url, (error, response, body) => {
    if (error) {
      console.error(error);
      return;
    }
  
    const $ = cheerio.load(body);
    const alt_p1 = $('.alt_p1');
    const alt_p2=$('.alt_p2')
    var works=[];
    const fileData = fs.readFileSync(dataFilePath, 'utf-8');
    $('.alt_p1, .alt_p2').each((i, el) => {
      try {
        if(!fileData.includes($(el).text())){
          works.push($(el).text())
          fs.appendFileSync('data.txt', $(el).text() + '\n');
        }
      } catch (error) {
        console.log("error", error)
      }
    });
    if(works.length>0){
      senderMail(works).then(works.length=0)
    }
    console.log(works)
  });

});


