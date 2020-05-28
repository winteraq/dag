import React, { useCallback } from 'react';
import IndexLayout from '../layouts';
import { Dag } from '@library';
import { useState } from 'react';
import { css } from '@emotion/core';
// const edges = [
//   { start: '17', end: '51', startCol: '33', endCol: '87' },
//   { start: '0', end: '3', startCol: '8', endCol: '7' },
//   { start: '3', end: '17', startCol: '7', endCol: '33' },
//   { start: '0', end: '3', startCol: '0', endCol: '3' },
//   { start: '0', end: '5', startCol: '4', endCol: '5' },
//   { start: '3', end: '17', startCol: '3', endCol: '17' },
//   { start: '0', end: '9', startCol: '8', endCol: '9' },
//   { start: '25', end: '69', startCol: '25', endCol: '69' },
//   { start: '17', end: '51', startCol: '17', endCol: '51' },
//   { start: '0', end: '1', startCol: '0', endCol: '1' },
//   { start: '0', end: '3', startCol: '4', endCol: '7' },
//   { start: '5', end: '25', startCol: '5', endCol: '25' },
//   { start: '0', end: '1', startCol: '8', endCol: '1' },
// ];
// const nodes = [
//   {
//     cid: 0,
//     urn: 'hive:///test_db/B',
//     type: 'hive',
//     vid: 3,
//     layer: null,
//     task_infos: [],
//     columns: [
//       { id: '3', label: 'col-b2' },
//       { id: '7', label: 'col-b1' },
//     ],
//     dataset_info: {
//       status: null,
//       latest_partition_ct: null,
//       comment: null,
//       owners: null,
//       product_lines: null,
//       theme: null,
//       layer: null,
//       project: null,
//       parent_name: null,
//       name: null,
//       department: null,
//       tags: null,
//     },
//     id: '3',
//     label: 'hive:///test_db/B',
//   },
//   {
//     cid: 0,
//     urn: 'hive:///test_db/E',
//     type: 'hive',
//     vid: 1,
//     layer: null,
//     task_infos: [],
//     columns: [{ id: '1', label: 'col-e1' }],
//     dataset_info: {
//       status: null,
//       latest_partition_ct: null,
//       comment: null,
//       owners: null,
//       product_lines: null,
//       theme: null,
//       layer: null,
//       project: null,
//       parent_name: null,
//       name: null,
//       department: null,
//       tags: null,
//     },
//     id: '1',
//     label: 'hive:///test_db/E',
//   },
//   {
//     cid: 0,
//     urn: 'hive:///test_db/C',
//     type: 'hive',
//     vid: 17,
//     layer: null,
//     task_infos: [],
//     columns: [
//       { id: '17', label: 'col-c2' },
//       { id: '33', label: 'col-c1' },
//     ],
//     dataset_info: {
//       status: null,
//       latest_partition_ct: null,
//       comment: null,
//       owners: null,
//       product_lines: null,
//       theme: null,
//       layer: null,
//       project: null,
//       parent_name: null,
//       name: null,
//       department: null,
//       tags: null,
//     },
//     id: '17',
//     label: 'hive:///test_db/C',
//   },
//   {
//     cid: 0,
//     urn: 'hive:///test_db/F',
//     type: 'hive',
//     vid: 9,
//     layer: null,
//     task_infos: [],
//     columns: [{ id: '9', label: 'col-f1' }],
//     dataset_info: {
//       status: null,
//       latest_partition_ct: null,
//       comment: null,
//       owners: null,
//       product_lines: null,
//       theme: null,
//       layer: null,
//       project: null,
//       parent_name: null,
//       name: null,
//       department: null,
//       tags: null,
//     },
//     id: '9',
//     label: 'hive:///test_db/F',
//   },
//   {
//     cid: 0,
//     urn: 'hive:///test_db/I',
//     type: 'hive',
//     vid: 69,
//     layer: null,
//     task_infos: [],
//     columns: [{ id: '69', label: 'col-i1' }],
//     dataset_info: {
//       status: null,
//       latest_partition_ct: null,
//       comment: null,
//       owners: null,
//       product_lines: null,
//       theme: null,
//       layer: null,
//       project: null,
//       parent_name: null,
//       name: null,
//       department: null,
//       tags: null,
//     },
//     id: '69',
//     label: 'hive:///test_db/I',
//   },
//   {
//     cid: 0,
//     urn: 'hive:///test_db/D',
//     type: 'hive',
//     vid: 51,
//     layer: null,
//     task_infos: [],
//     columns: [
//       { id: '87', label: 'col-d1' },
//       { id: '51', label: 'col-d2' },
//     ],
//     dataset_info: {
//       status: null,
//       latest_partition_ct: null,
//       comment: null,
//       owners: null,
//       product_lines: null,
//       theme: null,
//       layer: null,
//       project: null,
//       parent_name: null,
//       name: null,
//       department: null,
//       tags: null,
//     },
//     id: '51',
//     label: 'hive:///test_db/D',
//   },
//   {
//     cid: 0,
//     urn: 'hive:///test_db/G',
//     type: 'hive',
//     vid: 5,
//     layer: null,
//     task_infos: [],
//     columns: [{ id: '5', label: 'col-g1' }],
//     dataset_info: {
//       status: null,
//       latest_partition_ct: null,
//       comment: null,
//       owners: null,
//       product_lines: null,
//       theme: null,
//       layer: null,
//       project: null,
//       parent_name: null,
//       name: null,
//       department: null,
//       tags: null,
//     },
//     id: '5',
//     label: 'hive:///test_db/G',
//   },
//   {
//     cid: 0,
//     urn: 'hive:///test_db/H',
//     type: 'hive',
//     vid: 25,
//     layer: null,
//     task_infos: [],
//     columns: [{ id: '25', label: 'col-h1' }],
//     dataset_info: {
//       status: null,
//       latest_partition_ct: null,
//       comment: null,
//       owners: null,
//       product_lines: null,
//       theme: null,
//       layer: null,
//       project: null,
//       parent_name: null,
//       name: 1,
//       department: null,
//       tags: null,
//     },
//     id: '25',
//     label: 'hive:///test_db/H',
//   },
//   {
//     cid: 0,
//     urn: 'hive:///test_db/A',
//     type: 'hive',
//     vid: 0,
//     layer: null,
//     task_infos: [],
//     columns: [
//       { id: '4', label: 'col-a2' },
//       { id: '8', label: 'col-a1' },
//       { id: '0', label: 'col-a3' },
//     ],
//     dataset_info: {
//       status: null,
//       latest_partition_ct: null,
//       comment: null,
//       owners: null,
//       product_lines: null,
//       theme: null,
//       layer: null,
//       project: null,
//       parent_name: null,
//       name: 1,
//       department: null,
//       tags: null,
//     },
//     id: '0',
//     label: 'hive:///test_db/A',
//   },
// ];
const nodes = [{"vid":"90","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_game_platform","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"90","label":"hdfs:///data/kafka_dump/mario_event_game_platform"},{"vid":"88","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_wallet_all_platform","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"88","label":"hdfs:///data/kafka_dump/mario_event_wallet_all_platform"},{"vid":"132","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_qrec_standalone","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"132","label":"hdfs:///data/kafka_dump/mario_event_qrec_standalone"},{"vid":"21","cid":0,"urn":"clickhouse:///aeolus_sql_routine_aeolus_schedule_cn/table_17422996","type":"clickhouse","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"clickhouse","id":"21","label":"clickhouse:///aeolus_sql_routine_aeolus_schedule_cn/table_17422996"},{"vid":"59","cid":0,"urn":"clickhouse:///aeolus_sql_routine_aeolus_schedule_cn/table_17382428","type":"clickhouse","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"clickhouse","id":"59","label":"clickhouse:///aeolus_sql_routine_aeolus_schedule_cn/table_17382428"},{"vid":"69","cid":0,"urn":"clickhouse:///aeolus_sql_routine_aeolus_schedule_cn/table_15889556","type":"clickhouse","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"clickhouse","id":"69","label":"clickhouse:///aeolus_sql_routine_aeolus_schedule_cn/table_15889556"},{"vid":"7","cid":0,"urn":"hive:///caijing_stock_stats/stock_dav_daily","type":"hive","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hive","id":"7","label":"hive:///caijing_stock_stats/stock_dav_daily"},{"vid":"166","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_eyeu","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"166","label":"hdfs:///data/kafka_dump/mario_event_eyeu"},{"vid":"170","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_pb_union_game","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"170","label":"hdfs:///data/kafka_dump/mario_event_pb_union_game"},{"vid":"144","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_mobile_game","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"144","label":"hdfs:///data/kafka_dump/mario_event_mobile_game"},{"vid":"73","cid":0,"urn":"clickhouse:///aeolus_data_db_aeolus_alpha_202003/aeolus_data_table_32868_prod","type":"clickhouse","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"clickhouse","id":"73","label":"clickhouse:///aeolus_data_db_aeolus_alpha_202003/aeolus_data_table_32868_prod"},{"vid":"160","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_misc","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"160","label":"hdfs:///data/kafka_dump/mario_event_misc"},{"vid":"11","cid":0,"urn":"hive:///user_dw/dw_u_notify_sys_msg_app_log_daily","type":"hive","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hive","id":"11","label":"hive:///user_dw/dw_u_notify_sys_msg_app_log_daily"},{"vid":"150","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_dirty","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"150","label":"hdfs:///data/kafka_dump/mario_event_dirty"},{"vid":"112","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_e_commerce","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"112","label":"hdfs:///data/kafka_dump/mario_event_e_commerce"},{"vid":"158","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_ucenter","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"158","label":"hdfs:///data/kafka_dump/mario_event_ucenter"},{"vid":"142","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_girls","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"142","label":"hdfs:///data/kafka_dump/mario_event_girls"},{"vid":"35","cid":0,"urn":"hive:///dm_aweme_recommend/aweme_sticker_event_publish","type":"hive","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hive","id":"35","label":"hive:///dm_aweme_recommend/aweme_sticker_event_publish"},{"vid":"122","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_pb_bds","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"122","label":"hdfs:///data/kafka_dump/mario_event_pb_bds"},{"vid":"126","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_second_app","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"126","label":"hdfs:///data/kafka_dump/mario_event_second_app"},{"vid":"53","cid":0,"urn":"clickhouse:///aeolus_sql_routine_aeolus_schedule_cn/table_17422703","type":"clickhouse","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"clickhouse","id":"53","label":"clickhouse:///aeolus_sql_routine_aeolus_schedule_cn/table_17422703"},{"vid":"13","cid":0,"urn":"hive:///aweme/dwm_bluev_home_visit_action_di","type":"hive","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hive","id":"13","label":"hive:///aweme/dwm_bluev_home_visit_action_di"},{"vid":"86","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_magic","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"86","label":"hdfs:///data/kafka_dump/mario_event_magic"},{"vid":"136","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_pb_video_kids","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"136","label":"hdfs:///data/kafka_dump/mario_event_pb_video_kids"},{"vid":"17","cid":0,"urn":"hive:///dm_lark/dm_admin_invite_admin_uv_daily","type":"hive","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":"zhangcheng.alan","product_lines":null,"theme":null,"layer":null,"project":"Data-数据分析-UGC","parent_name":"huati","name":"private_message_et_num_new","department":"Data-数据分析-数据分析师","tags":null},"dbType":"hive","id":"17","label":"hive:///dm_lark/dm_admin_invite_admin_uv_daily"},{"vid":"49","cid":0,"urn":"clickhouse:///aeolus_sql_routine_aeolus_schedule_cn/table_16197915","type":"clickhouse","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"clickhouse","id":"49","label":"clickhouse:///aeolus_sql_routine_aeolus_schedule_cn/table_16197915"},{"vid":"174","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_pb_maya","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"174","label":"hdfs:///data/kafka_dump/mario_event_pb_maya"},{"vid":"130","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_pb_metrics","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"130","label":"hdfs:///data/kafka_dump/mario_event_pb_metrics"},{"vid":"156","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_spring_festival","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"156","label":"hdfs:///data/kafka_dump/mario_event_spring_festival"},{"vid":"3","cid":0,"urn":"clickhouse:///aeolus_data_db_aeolus_alpha_202003/aeolus_data_table_32965_prod","type":"clickhouse","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"clickhouse","id":"3","label":"clickhouse:///aeolus_data_db_aeolus_alpha_202003/aeolus_data_table_32965_prod"},{"vid":"71","cid":0,"urn":"hive:///dm_autocar/autocar_rpt_spring_campaign_core_data_daily","type":"hive","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hive","id":"71","label":"hive:///dm_autocar/autocar_rpt_spring_campaign_core_data_daily"},{"vid":"146","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_pb_gecko","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"146","label":"hdfs:///data/kafka_dump/mario_event_pb_gecko"},{"vid":"140","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_video_kids","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"140","label":"hdfs:///data/kafka_dump/mario_event_video_kids"},{"vid":"96","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_toutiao_2nd","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"96","label":"hdfs:///data/kafka_dump/mario_event_toutiao_2nd"},{"vid":"55","cid":0,"urn":"topic:///kafka_ent/ies_dm_ploy_event_notify","type":"topic","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"topic","id":"55","label":"topic:///kafka_ent/ies_dm_ploy_event_notify"},{"vid":"134","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_pb_stock","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"134","label":"hdfs:///data/kafka_dump/mario_event_pb_stock"},{"vid":"116","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_pb_life","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"116","label":"hdfs:///data/kafka_dump/mario_event_pb_life"},{"vid":"61","cid":0,"urn":"hive:///dm_quality/qrec_sug_top100_query","type":"hive","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hive","id":"61","label":"hive:///dm_quality/qrec_sug_top100_query"},{"vid":"47","cid":0,"urn":"clickhouse:///aeolus_sql_routine_aeolus_schedule_cn/table_18871916","type":"clickhouse","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"clickhouse","id":"47","label":"clickhouse:///aeolus_sql_routine_aeolus_schedule_cn/table_18871916"},{"vid":"84","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_pb_faceu","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"84","label":"hdfs:///data/kafka_dump/mario_event_pb_faceu"},{"vid":"152","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_to_b","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"152","label":"hdfs:///data/kafka_dump/mario_event_to_b"},{"vid":"110","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_live_platform","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"110","label":"hdfs:///data/kafka_dump/mario_event_live_platform"},{"vid":"162","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_pb_girls","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"162","label":"hdfs:///data/kafka_dump/mario_event_pb_girls"},{"vid":"114","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_pb_tuchong","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"114","label":"hdfs:///data/kafka_dump/mario_event_pb_tuchong"},{"vid":"98","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_miracle_festival","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"98","label":"hdfs:///data/kafka_dump/mario_event_miracle_festival"},{"vid":"102","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_uploader","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"102","label":"hdfs:///data/kafka_dump/mario_event_uploader"},{"vid":"92","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_pb_xuanwu","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"92","label":"hdfs:///data/kafka_dump/mario_event_pb_xuanwu"},{"vid":"168","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_pb_automobile","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"168","label":"hdfs:///data/kafka_dump/mario_event_pb_automobile"},{"vid":"164","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_life","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"164","label":"hdfs:///data/kafka_dump/mario_event_life"},{"vid":"106","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_caijing_casher","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"106","label":"hdfs:///data/kafka_dump/mario_event_caijing_casher"},{"vid":"94","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_pb_mobile_game","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"94","label":"hdfs:///data/kafka_dump/mario_event_pb_mobile_game"},{"vid":"138","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_metrics","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"138","label":"hdfs:///data/kafka_dump/mario_event_metrics"},{"vid":"57","cid":0,"urn":"clickhouse:///aeolus_data_db_aeolus_lambda_202005/aeolus_data_table_41658_prod","type":"clickhouse","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"clickhouse","id":"57","label":"clickhouse:///aeolus_data_db_aeolus_lambda_202005/aeolus_data_table_41658_prod"},{"vid":"118","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_pb_video","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"118","label":"hdfs:///data/kafka_dump/mario_event_pb_video"},{"vid":"104","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_pb_live","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"104","label":"hdfs:///data/kafka_dump/mario_event_pb_live"},{"vid":"172","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_docs_platform","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"172","label":"hdfs:///data/kafka_dump/mario_event_docs_platform"},{"vid":"33","cid":0,"urn":"clickhouse:///aeolus_sql_routine_aeolus_schedule_cn/table_16197395","type":"clickhouse","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"clickhouse","id":"33","label":"clickhouse:///aeolus_sql_routine_aeolus_schedule_cn/table_16197395"},{"vid":"19","cid":0,"urn":"hive:///huati/private_message_et_num_new","type":"hive","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hive","id":"19","label":"hive:///huati/private_message_et_num_new"},{"vid":"108","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_pb_banciyuan","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"108","label":"hdfs:///data/kafka_dump/mario_event_pb_banciyuan"},{"vid":"45","cid":0,"urn":"hive:///dm_lark/openplatform_app_publish_daily","type":"hive","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hive","id":"45","label":"hive:///dm_lark/openplatform_app_publish_daily"},{"vid":"124","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_pb_eyeu","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"124","label":"hdfs:///data/kafka_dump/mario_event_pb_eyeu"},{"vid":"100","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_aweme_4th","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"100","label":"hdfs:///data/kafka_dump/mario_event_aweme_4th"},{"vid":"120","cid":0,"urn":"hdfs:///data/kafka_dump/push_event_aweme","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"120","label":"hdfs:///data/kafka_dump/push_event_aweme"},{"vid":"128","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_comic_platform","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"128","label":"hdfs:///data/kafka_dump/mario_event_comic_platform"},{"vid":"154","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_ad_all","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"154","label":"hdfs:///data/kafka_dump/mario_event_ad_all"},{"vid":"148","cid":0,"urn":"hdfs:///data/kafka_dump/mario_event_pb_wenda","type":"hdfs","layer":1,"task_infos":[],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hdfs","id":"148","label":"hdfs:///data/kafka_dump/mario_event_pb_wenda"},{"vid":"0","cid":0,"urn":"hive:///origin_log/event_log_hourly","type":"hive","layer":null,"task_infos":[{"platform":"dorado","task_name":"repair_lark","owner":"wuxiaoqi.666","task_type":"HSQL","task_id":"100100573","params":null}],"columns":[],"dataset_info":{"status":null,"latest_partition_ct":null,"comment":null,"owners":null,"product_lines":null,"theme":null,"layer":null,"project":null,"parent_name":null,"name":null,"department":null,"tags":null},"dbType":"hive","id":"0","label":"hive:///origin_log/event_log_hourly"}]
const edges = [{"vid1":"0","vid2":"35","sub_vid1":null,"sub_vid2":null,"start":"0","end":"35","startCol":"null","endCol":"null"},{"vid1":"134","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"134","end":"0","startCol":"null","endCol":"null"},{"vid1":"136","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"136","end":"0","startCol":"null","endCol":"null"},{"vid1":"138","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"138","end":"0","startCol":"null","endCol":"null"},{"vid1":"130","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"130","end":"0","startCol":"null","endCol":"null"},{"vid1":"132","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"132","end":"0","startCol":"null","endCol":"null"},{"vid1":"150","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"150","end":"0","startCol":"null","endCol":"null"},{"vid1":"158","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"158","end":"0","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"45","sub_vid1":null,"sub_vid2":null,"start":"0","end":"45","startCol":"null","endCol":"null"},{"vid1":"118","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"118","end":"0","startCol":"null","endCol":"null"},{"vid1":"154","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"154","end":"0","startCol":"null","endCol":"null"},{"vid1":"86","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"86","end":"0","startCol":"null","endCol":"null"},{"vid1":"112","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"112","end":"0","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"69","sub_vid1":null,"sub_vid2":null,"start":"0","end":"69","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"0","end":"0","startCol":"null","endCol":"null"},{"vid1":"114","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"114","end":"0","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"11","sub_vid1":null,"sub_vid2":null,"start":"0","end":"11","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"21","sub_vid1":null,"sub_vid2":null,"start":"0","end":"21","startCol":"null","endCol":"null"},{"vid1":"116","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"116","end":"0","startCol":"null","endCol":"null"},{"vid1":"156","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"156","end":"0","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"55","sub_vid1":null,"sub_vid2":null,"start":"0","end":"55","startCol":"null","endCol":"null"},{"vid1":"88","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"88","end":"0","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"7","sub_vid1":null,"sub_vid2":null,"start":"0","end":"7","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"53","sub_vid1":null,"sub_vid2":null,"start":"0","end":"53","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"59","sub_vid1":null,"sub_vid2":null,"start":"0","end":"59","startCol":"null","endCol":"null"},{"vid1":"170","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"170","end":"0","startCol":"null","endCol":"null"},{"vid1":"172","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"172","end":"0","startCol":"null","endCol":"null"},{"vid1":"174","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"174","end":"0","startCol":"null","endCol":"null"},{"vid1":"100","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"100","end":"0","startCol":"null","endCol":"null"},{"vid1":"84","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"84","end":"0","startCol":"null","endCol":"null"},{"vid1":"160","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"160","end":"0","startCol":"null","endCol":"null"},{"vid1":"92","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"92","end":"0","startCol":"null","endCol":"null"},{"vid1":"94","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"94","end":"0","startCol":"null","endCol":"null"},{"vid1":"152","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"152","end":"0","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"49","sub_vid1":null,"sub_vid2":null,"start":"0","end":"49","startCol":"null","endCol":"null"},{"vid1":"162","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"162","end":"0","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"73","sub_vid1":null,"sub_vid2":null,"start":"0","end":"73","startCol":"null","endCol":"null"},{"vid1":"110","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"110","end":"0","startCol":"null","endCol":"null"},{"vid1":"120","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"120","end":"0","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"3","sub_vid1":null,"sub_vid2":null,"start":"0","end":"3","startCol":"null","endCol":"null"},{"vid1":"140","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"140","end":"0","startCol":"null","endCol":"null"},{"vid1":"144","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"144","end":"0","startCol":"null","endCol":"null"},{"vid1":"148","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"148","end":"0","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"13","sub_vid1":null,"sub_vid2":null,"start":"0","end":"13","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"47","sub_vid1":null,"sub_vid2":null,"start":"0","end":"47","startCol":"null","endCol":"null"},{"vid1":"124","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"124","end":"0","startCol":"null","endCol":"null"},{"vid1":"142","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"142","end":"0","startCol":"null","endCol":"null"},{"vid1":"90","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"90","end":"0","startCol":"null","endCol":"null"},{"vid1":"96","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"96","end":"0","startCol":"null","endCol":"null"},{"vid1":"122","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"122","end":"0","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"57","sub_vid1":null,"sub_vid2":null,"start":"0","end":"57","startCol":"null","endCol":"null"},{"vid1":"102","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"102","end":"0","startCol":"null","endCol":"null"},{"vid1":"128","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"128","end":"0","startCol":"null","endCol":"null"},{"vid1":"164","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"164","end":"0","startCol":"null","endCol":"null"},{"vid1":"104","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"104","end":"0","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"33","sub_vid1":null,"sub_vid2":null,"start":"0","end":"33","startCol":"null","endCol":"null"},{"vid1":"168","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"168","end":"0","startCol":"null","endCol":"null"},{"vid1":"106","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"106","end":"0","startCol":"null","endCol":"null"},{"vid1":"126","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"126","end":"0","startCol":"null","endCol":"null"},{"vid1":"166","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"166","end":"0","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"19","sub_vid1":null,"sub_vid2":null,"start":"0","end":"19","startCol":"null","endCol":"null"},{"vid1":"98","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"98","end":"0","startCol":"null","endCol":"null"},{"vid1":"146","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"146","end":"0","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"17","sub_vid1":null,"sub_vid2":null,"start":"0","end":"17","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"61","sub_vid1":null,"sub_vid2":null,"start":"0","end":"61","startCol":"null","endCol":"null"},{"vid1":"0","vid2":"71","sub_vid1":null,"sub_vid2":null,"start":"0","end":"71","startCol":"null","endCol":"null"},{"vid1":"108","vid2":"0","sub_vid1":null,"sub_vid2":null,"start":"108","end":"0","startCol":"null","endCol":"null"}]
const IndexPage = () => {
  const [activeNode, setActiveNode] = useState<{ id: string; columnId?: string } | undefined>({
    id: '4',
    columnId: '1',
  });
  const [hoverInfo, setHoverInfo] = useState<{
    left: number;
    top: number;
    text: string;
    scale: number;
  } | null>(null);
  const onNodeHover = useCallback((node, pos, stage) => {
    console.log('===>', node, pos);
    const scale = stage.scaleX();
    setHoverInfo({
      scale,
      text: node.label,
      left: pos.x + (node.width / 2) * scale,
      top: pos.y,
    });
  }, []);
  const onNodeOutHover = useCallback(() => {
    setHoverInfo(null);
  }, []);
  console.log('hoverInfo', hoverInfo);
  return (
    <IndexLayout>
      <Dag
        edges={edges}
        nodes={nodes}
        // groupBy={{
        //   key: 'dataset_info.name',
        //   label: '负责人',
        // }}
        type={'column'}
        primaryNode={{ id: '0' }}
        activeNode={activeNode}
        searchKey={'test'}
        onStageClick={() => {
          setActiveNode(undefined);
        }}
        onNodeHover={onNodeHover}
        onNodeOutHover={onNodeOutHover}
        onNodeClick={(e, node, column) => {
          console.log(e, node, column);
          if (node.id === activeNode?.id) {
            if (activeNode.columnId === column?.id) {
              setActiveNode(undefined);
              return;
            }
          }
          setActiveNode({
            id: node.id,
            columnId: column?.id,
          });
        }}
      />
      <div
        css={css`
          left: ${hoverInfo?.left}px;
          top: ${hoverInfo?.top}px;
          position: absolute;
          background-color: #282f38;
          padding: 8px 12px;
          color: white;
          font-size: 14px;
          border-radius: 2px;
          //scale(${hoverInfo?.scale})
          transform: translate(-50%, calc(-100% - 5px)) ;
        `}
      >
        <div
          css={css`
            border: solid transparent;
            content: '';
            height: 8px;
            width: 8px;
            position: absolute;
            left: 0;
            display: block;
            box-sizing: border-box;
            transform: rotate(45deg);
            transform-origin: 50% -50% 0;
            bottom: -5px;
            margin-left: 50%;
            background-color: #282f38;
          `}
        />
        {hoverInfo?.text}
      </div>
    </IndexLayout>
  );
};

export default IndexPage;
