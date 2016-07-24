#!/usr/bin/env node
/**
 * Created by yangguo on 2016/7/23 0023.
 */
let fs = require("fs");
let child_process = require('child_process');
var Promise = require('promise');

/**
 * 原文件目录
 * @type {string}
 */
const srcDirName = 'src'
/**
 * 输出文件目录
 * @type {string}
 */
const outPutDirName = 'output';

let srcDir = __dirname + '/' + srcDirName + '/';
let outPutDir = __dirname + '/' + outPutDirName + '/';
//判断输出目录是否存在 如果存在 则清空
fs.exists(outPutDir, (result)=> {
    if (!result) {
        fs.mkdir(outPutDirName, (err)=> {
            if (err) {
                return console.error(err);
            }
        });
        return;
    }

    fs.readdir(outPutDir, (err, files)=> {
        files.forEach((file)=> {
            fs.unlink(outPutDir + file, (err)=> {
                if (err) {
                    console.log(err);
                }
            });
        });
    });
});

//读取原文件目录,并生成markdown
fs.readdir(srcDir, (err, files)=> {
    console.log('生成中...');

    new Promise((resolve, reject)=> {
        if (err) {
            console.error(err);
            return;
        }

        files.forEach((filName, i)=> {
            child_process.exec('node ' + srcDirName + '/' + filName, (error, data)=> {
                if (error) {
                    return console.log(error);
                }
                
                let mdName = filName.split(/\.js$/).join('.md');

                fs.writeFile(outPutDir + mdName, data, (err)=> {
                    if (err) {
                        return console.error(err);
                    }
                    console.log(mdName + ' 成功!');
                    if (i === files.length - 1) {
                        resolve(200);
                    }
                });
            });
        });
    }).then((code)=> {
        console.log('完成(' + code + ')');
    });
});
