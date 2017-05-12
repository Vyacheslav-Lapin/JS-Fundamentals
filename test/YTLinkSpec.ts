'use strict';

// import {YTTime, YTLink, YTEmbedLink} from '/scripts/YTLink';

console.log(new YTTime([3, 2, 1]).toString() === '1h2m3s');
console.log(new YTTime([3, 2, NaN]).toString() === '2m3s');
console.log(new YTTime([3, 2, 1]).toSeconds() === ((60 + 2) * 60) + 3);

console.log(YTTime.parse('1h2m3s').toString() === '1h2m3s');
console.log(YTTime.parse('2m3s').toString() === '2m3s');
console.log(YTTime.parse('1h2m3s').toSeconds() === ((60 + 2) * 60) + 3);

console.log((YTTime.parseForm('1:2:3').toString() === '1h2m3s'));
console.log((YTTime.parseForm('2:3').toString() === '2m3s'));
console.log((YTTime.parseForm('3').toString() === '3s'));


console.log(new YTLink('khafgfdagrr', YTTime.parse('1h2m3s')).toString() === 'https://youtu.be/khafgfdagrr?t=1h2m3s');

console.log(YTLink.parse('https://youtu.be/k0jC50TcdR0?t=1h5m2s').toString() ===
    'https://youtu.be/k0jC50TcdR0?t=1h5m2s');

console.log(new YTEmbedLink('dfsfsf', new YTTime([3, 2, 1]), new YTTime([4, 2, 1])).toString() ===
    'https://www.youtube.com/embed/dfsfsf?start=3723&end=3724&autoplay=1');

console.log(new YTEmbedLink('khafgfdag', YTTime.parse('1h2m3s'), YTTime.parse('1h2m4s')).toString() ===
    'https://www.youtube.com/embed/khafgfdag?start=3723&end=3724&autoplay=1');

console.log(YTEmbedLink.parseForm('https://youtu.be/khafgfdag?t=1h2m3s', '1:2:4').toString() ===
    'https://www.youtube.com/embed/khafgfdag?start=3723&end=3724&autoplay=1');
