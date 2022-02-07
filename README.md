# Node Assignement

Hapijs & react with github AOuth

## Installation

Use the google extention [cors](https://chrome.google.com/webstore/detail/cross-domain-cors/mjhpgnbimicffchbodmgfnemoghjakai/)

## Usage

```bash
run server
node index.js
```

```bash
run node-client
npm start
```

{
  "name": "swiper/react",
  "private": true,
  "main": "../swiper-react.cjs.js",
  "jsnext:main": "../swiper-react.esm.js",
  "module": "../swiper-react.esm.js",
  "typings": "../swiper-react.d.ts",
  "sideEffects": false
}

import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper/core";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

SwiperCore.use([Navigation]);
