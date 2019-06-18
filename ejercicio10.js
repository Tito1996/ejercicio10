const http = require('http');
const url = require('url');
const fs = require('fs');

const mime = {
    'html' : 'text/html',
    'css' : 'text/css',
    'jpg' : 'image/jpg',
    'ico' : 'image/x-ico',
    'mp3' : 'audio/mpeg3',
    'mp4' : 'video/mp4'
}

const servidor = http