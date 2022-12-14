const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");
const path=require("path");
const pdfkit=require("pdfkit");
function getIssuesPageHtml(url,topic,repoName){
    request(url,cb);
    function cb(err,response,html){
        if(err)
        console.log(err);
        else if(response.statusCode==404){
            console.log("page not found")
        }
        else{
            getIssues(html);
            // console.log(html);
        }
    }
    function getIssues(html){
        let $=cheerio.load(html);
        let issuesElemArr=$(".d-block.d-md-none.position-absolute.top-0.bottom-0.left-0.right-0");
        let arr=[];
        console.log(issuesElemArr.length);
        for(let i=0;i<issuesElemArr.length;i++){
            let link=$(issuesElemArr[i]).attr("href");
            arr.push(link);
            // console.log(link);
        }
        // console.log(topic,"   ",arr);
        let folderPath=path.join(__dirname,topic);
        dirCreater(folderPath);
        let filePath=path.join(folderPath,repoName+".pdf");
        let text=JSON.stringify(arr);
        let pdfDoc=new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();
        // fs.writeFileSync(filePath,);


    }
}
module.exports=getIssuesPageHtml;
function dirCreater(folderPath){
    if(!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath);
    }
}