## [2.0.3](https://github.com/DisQada/Scraper/compare/v2.0.2...v2.0.3) (2024-10-19)

### Features

* إضافة إمكانية مقارنة الصفات بكائن ([378d7dd](https://github.com/DisQada/Scraper/commit/378d7dd90a89df2046bea2fff1f21047b5f66820))

### Bug Fixes

* إصلاح منطق تحليل قيم الصفات ([be49876](https://github.com/DisQada/Scraper/commit/be498766af968ee71fefb2c6b1ab2c9c65b6ef69))

## [2.0.2](https://github.com/DisQada/Scraper/compare/v2.0.1...v2.0.2) (2024-09-14)


### Bug Fixes

* إرجاع طرد himalaya مؤقتاً ([7926c34](https://github.com/DisQada/Scraper/commit/7926c349e6dbc38ee253e5fdfcc1ac9d26e30267))
* إصلاح أوامر كتابة الملفات ([75939dd](https://github.com/DisQada/Scraper/commit/75939dd2182c2dab80a3d6e076d88c9e8009a341))
* إصلاح ملف الأوامر البرمجية ([73a44e3](https://github.com/DisQada/Scraper/commit/73a44e39f96d0e850ddccaddeb84f65649869122))

## [2.0.1](https://github.com/DisQada/Scraper/compare/v2.0.0...v2.0.1) (2024-09-14)


### Bug Fixes

* إنتاج الأنواع قبل نشر الطرد ([ab22b77](https://github.com/DisQada/Scraper/commit/ab22b773a781334bf746836b6ecc6f6739b74ef7))

# [2.0.0](https://github.com/DisQada/Scraper/compare/v1.0.0...v2.0.0) (2024-09-13)


### Bug Fixes

* إزالة علامات التنصيص من قيمة الattr قبل إرجاعها ([72b3d59](https://github.com/DisQada/Scraper/commit/72b3d59c3d6994a837989fb47642539b024949d2))
* إستخراج دالة parse بشكل صحيح ([02f4383](https://github.com/DisQada/Scraper/commit/02f43833e5268db09ad1f2900babb902a1c99652))
* إستخراج دالتي grabNode وgrabChild ([8c6a01c](https://github.com/DisQada/Scraper/commit/8c6a01ce108438cc0d92e3881faf99cccfe93287))
* إصلاح منطق دوال التحقق من المطابقة ([2535abd](https://github.com/DisQada/Scraper/commit/2535abdb254169b4c5636576d21bb141408dce83))


### Code Refactoring

* إزالة إمكانية تمرير نص لدالة findNode ([fd4c8b3](https://github.com/DisQada/Scraper/commit/fd4c8b3b65d84f7ec4ca79761e0162658cc38858))
* تغيير الدوال التسلسلية من مباشرة إلى إرتباطية ([700b6c9](https://github.com/DisQada/Scraper/commit/700b6c981fd8ee83e99377c4a5f2be5db6356f1c))
* تغيير نوع جافا سكربت من CJS إلى MJS ([e5fa03a](https://github.com/DisQada/Scraper/commit/e5fa03a9dc2c022fa425bb5d334ebf9d8ff50a52))


### Features

* Add support for ES Module ([29aeaaa](https://github.com/DisQada/Scraper/commit/29aeaaab8a1f8279604ace7fa511caefa5ada1ef))
* إستخراج الأنواع ودالة parse ([7197567](https://github.com/DisQada/Scraper/commit/71975677544802746b55f0a9180462c11dc678ae))
* إضافة دالتي grabNode وgrabChild ([240e6be](https://github.com/DisQada/Scraper/commit/240e6be82e62fc26358feaf5812565c875caabe5))
* إضافة مفكك نصوص خاص بدل himalaya ([19a8d67](https://github.com/DisQada/Scraper/commit/19a8d6793baf726b0cf0b599c880574cd015fe3b))
* جعل دوال grab ترجع قيمة دائماً ([feb62d3](https://github.com/DisQada/Scraper/commit/feb62d38caf81a6f71bd6c517536af97d23a88bd))


### BREAKING CHANGES

* لم يعد الطرد يعتمد على الطرد himalaya وإستبدله بنظام خاص داخلي
* لا يمكن إعطاء دالة findNode نص html بعد الآن، يجب تحويله لعقد أولاً
* تم تغيير أسماء الدوال التسلسلية في عقد العناصر، أضيفت كلمة get لبداية الدوال الثلاثة
* عدم القدرة على إستيراد الطرد من المشاريع المكتوبة بCJS

# 1.0.0 (2024-01-09)

### Features

- First commit ([9a670ed](https://github.com/DisQada/Scraper/commit/9a670edf30c0029eaee5f790965d3548c3ba15b9))
