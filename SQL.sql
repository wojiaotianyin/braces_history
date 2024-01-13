CREATE TABLE brace_history (
    id SERIAL PRIMARY KEY NOT NULL,
    visit_date timestamp NOT NULL,
    price INT NOT NULL,
    memo character varying(255),
    create_date timestamp NOT NULL,
    update_date timestamp NOT NULL
);

-- ALTER TABLE brace_history ALTER COLUMN price TYPE int using price::int;
-- ALTER TABLE brace_history ALTER COLUMN price SET NOT NULL;

-- UPDATE brace_history set visit_date = timestamp'2022-03-04 15:30:00' where id = 3;


INSERT INTO brace_history VALUES (default, '2022-01-16 00:00:00' , 2200, '初診料・自由診療費', now(), now());
INSERT INTO brace_history VALUES (default, '2022-01-30 00:00:00' , 500, 'セファログラム電子化', now(), now());
INSERT INTO brace_history VALUES (default, '2022-01-30 00:00:00' , 12550, '模型等作成', now(), now());
INSERT INTO brace_history VALUES (default, '2022-03-04 15:30:00' , 8290, '口腔機能診断', now(), now());
INSERT INTO brace_history VALUES (default, '2022-03-12 15:30:00' , 2430, 'スケーリング等', now(), now());
INSERT INTO brace_history VALUES (default, '2022-03-30 00:00:00' , 160, '歯間ゴム', now(), now());
INSERT INTO brace_history VALUES (default, '2022-04-02 00:00:00' , 1030, 'クリニック初診料', now(), now());
INSERT INTO brace_history VALUES (default, '2022-04-06 00:00:00' , 13930, 'リンガルアーチ装着', now(), now());
INSERT INTO brace_history VALUES (default, '2022-05-10 00:00:00' , 11970, 'マルチブラケット6本', now(), now());
INSERT INTO brace_history VALUES (default, '2022-05-23 00:00:00' , 6130, '小臼歯2本抜歯', now(), now());
INSERT INTO brace_history VALUES (default, '2022-06-04 00:00:00' , 1780, '清掃', now(), now());
INSERT INTO brace_history VALUES (default, '2022-06-10 00:00:00' , 7780, '上顎全体装置設置', now(), now());
INSERT INTO brace_history VALUES (default, '2022-07-09 00:00:00' , 15270, '下顎マルチブラケット8本', now(), now());
INSERT INTO brace_history VALUES (default, '2022-08-13 00:00:00' , 14010, '下顎マルチブラケット全歯', now(), now());
INSERT INTO brace_history VALUES (default, '2022-09-10 00:00:00' , 6270, '調整・パワーチェーン', now(), now());
INSERT INTO brace_history VALUES (default, '2022-09-17 00:00:00' , 1810, '駅前歯科清掃', now(), now());
INSERT INTO brace_history VALUES (default, '2022-10-15 00:00:00' , 6870, '調整・パワーチェーン', now(), now());
INSERT INTO brace_history VALUES (default, '2022-11-12 00:00:00' , 9080, '上顎ステンレス', now(), now());
INSERT INTO brace_history VALUES (default, '2022-12-12 00:00:00' , 3000, 'ゴム装着', now(), now());
INSERT INTO brace_history VALUES (default, '2023-1-14 00:00:00' , 6700, '調整・パワーチェーン', now(), now());
INSERT INTO brace_history VALUES (default, '2023-2-11 00:00:00' , 5160, '調整・パワーチェーン', now(), now());
INSERT INTO brace_history VALUES (default, '2023-3-11 00:00:00' , 3600, '調整・パワーチェーン、リンガルアーチ外れる', now(), now());
INSERT INTO brace_history VALUES (default, '2023-4-14 00:00:00' , 4030, '調整・ゴム掛けなし', now(), now());
INSERT INTO brace_history VALUES (default, '2023-5-13 00:00:00' , 3040, '調整・結紮', now(), now());
INSERT INTO brace_history VALUES (default, '2023-6-13 00:00:00' , 6040, '調整、レントゲン、型取り', now(), now());
INSERT INTO brace_history VALUES (default, '2023-7-15 00:00:00' , 9790, '保険料全額負担', now(), now());
INSERT INTO brace_history VALUES (default, '2023-8-12 00:00:00' , 2910, '調整', now(), now());
INSERT INTO brace_history VALUES (default, '2023-9-16 00:00:00' , 2920, '調整', now(), now());
INSERT INTO brace_history VALUES (default, '2023-10-14 00:00:00' , 2940, '調整', now(), now());
INSERT INTO brace_history VALUES (default, '2023-11-11 00:00:00' , 2000, '調整', now(), now());
INSERT INTO brace_history VALUES (default, '2023-12-09 00:00:00' , 3990, '調整', now(), now());
INSERT INTO brace_history VALUES (default, '2024-01-13 00:00:00' , 2750, '調整, 手術目処つく', now(), now());

select SUM(price) as total from brace_history;