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
INSERT INTO brace_history VALUES (default, '2022-04-02 00:00:00' , 1030, '鶴木クリニック初診料', now(), now());
INSERT INTO brace_history VALUES (default, '2022-04-06 00:00:00' , 13930, 'リンガルアーチ装着', now(), now());
INSERT INTO brace_history VALUES (default, '2022-05-10 00:00:00' , 11970, 'マルチブラケット6本', now(), now());
INSERT INTO brace_history VALUES (default, '2022-05-23 00:00:00' , 6130, '小臼歯2本抜歯', now(), now());
INSERT INTO brace_history VALUES (default, '2022-06-04 00:00:00' , 1780, '清掃', now(), now());
INSERT INTO brace_history VALUES (default, '2022-06-10 00:00:00' , 7780, '上顎全体装置設置', now(), now());