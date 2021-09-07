const Mock = require("mockjs");

const home = {
  "/digital-medical/custom-setting/banner/list-online": Mock.mock({
    "data|9": [
      {
        imageUrl: () => Mock.Random.image("343x99", Mock.Random.color()),
        "jumpType|1-5": 5,
        appId: () => Mock.Random.id(),
        jumpPath: () => Mock.Random.url("http"),
      },
    ],
    msg: "success",
    res: 0,
    time: "2021-05-27 14:59:55",
  }),
  "/digital-medical/custom-setting/tool-box/list-enabled": Mock.mock({
    "data|6": [
      {
        "title|2-6": () => Mock.Random.ctitle(),
        imageUrl: () => Mock.Random.image("40x40", Mock.Random.color()),
        "jumpType|1-5": 5,
        appId: () => Mock.Random.id(),
        jumpPath: () => Mock.Random.url("http"),
      },
    ],
    msg: "success",
    res: 0,
    time: "2021-05-27 14:59:55",
  }),
  "/digital-medical/pat-remind/list": Mock.mock({
    res: 0,
    "data|3-6": [
      {
        id: () => Mock.Random.guid(),
        phone: () => Mock.Random.date(),
        thirdId: () => Mock.Random.guid(),
        sourceType: 1,
        content: () => Mock.Random.cparagraph(20, 100),
      },
    ],
  }),
  "/celina-question/education/today": Mock.mock({
    res: 0,
    "data|3-5": [
      {
        "eduType|0-3": 0,
        hospName: "兰溪市人民医院",
        id: Mock.Random.guid(),
        jumpPath: "https://test.joinhealth.cn/eu/7WrpW0594?",
        "jumpType|0-4": 2,
        label: () => Mock.Random.ctitle(2, 2),
        patName: () => Mock.Random.cname(),
        title: () => Mock.Random.ctitle(),
      },
    ],
  }),
  "/digital-medical/edu-recommend/list": Mock.mock({
    res: 0,
    "data|6": [
      {
        "articleType|1-6": 4,
        courseName: () => Mock.Random.ctitle(7, 15),
        eduId: () => Mock.Random.guid(),
        "id|+1": "1",
        "sortNo|+1": 0,
        coursePreviewUrl: "https://baidu.com",
        coverPicture: () => Mock.Random.image("98x60", Mock.Random.color()),
        createTime: () => Mock.Random.date(),
      },
    ],
  }),

  "/digital-medical/edu-recommend/list-by-article-type": Mock.mock({
    res: 0,
    data: {
      lastPage: 2,
      startRow: 1,
      hasNextPage: true,
      prePage: 0,
      nextPage: 2,
      endRow: 3,
      pageSize: 3,
      "list|10": [
        {
          diagCodes: "",
          coverPicture: () => Mock.Random.image("98x60", Mock.Random.color()),
          labelNames: () => Mock.Random.ctitle(2, 2),
          deptCodes: "",
          categoryName: () => Mock.Random.ctitle(4, 4),
          courseSource: 1,
          diagNames: "",
          suitableNames: "",
          "articleType|1-6": 3,
          id: () => Mock.Random.guid(),
          processType: "1",
          suitableCodes: "",
          editorName: () => Mock.Random.cname(),
          editorId: "5341dde5b2274874a207b0aed3dfb10c",
          keyWords: "",
          coursePreviewUrl:
            "http://192.168.3.68/knowledge/common-education/get-detail?eduId=ff243a131298495b95c3f2dc4b061e0e",
          hospCode: "",
          isDelete: 0,
          dataType: 1,
          updateTime: () => Mock.Random.datetime(),
          recommended: 1,
          courseName: () => Mock.Random.ctitle(10, 15),
          labelCodes: "imagetext",
          deptNames: "",
          createTime: () => Mock.Random.datetime(),
          categoryId: "31716",
        },
      ],
      pageNum: 1,
      navigatePages: 8,
      navigateFirstPage: 1,
      total: 4,
      pages: 2,
      firstPage: 1,
      size: 3,
      isLastPage: false,
      hasPreviousPage: false,
      navigateLastPage: 2,
      isFirstPage: true,
    },
  }),
  "/celina-question/education/list-by-month": Mock.mock({
    res: 0,
    data: {
      month: () => Mock.Random.date("MM"),
      "monthData|10": [
        {
          "eduType|0-3": 1,
          hospName: () => Mock.Random.ctitle(5, 10),
          id: "c5afbde79b944a33aa1e3ee0b35476d3",
          isRead: () => Mock.Random.boolean(),
          jumpPath: () => Mock.Random.url(),
          "jumpType|0-4": 1,
          label: () => Mock.Random.ctitle(2, 3),
          patName: () => Mock.Random.cname(),
          sendTime: () => Mock.Random.datetime(),
          title: () => Mock.Random.ctitle(5, 15),
        },
      ],
    },
  }),
  "/digital-medical/pat-disease-history/list": Mock.mock({
    res: 0,
    "data|5": [
      {
        diseaseName: Mock.Random.ctitle(5, 10),
        "id|+1": 0,
        pid: () => Mock.Random.id(),
        "flag|0-1": 1,
        "subDiseases|0-4": [
          {
            diseaseName: Mock.Random.ctitle(5, 10),
            "id|+1": 0,
            pid: () => Mock.Random.id(),
            "flag|0-1": 1,
          },
        ],
      },
    ],
  }),

  "/digital-medical/task/today": Mock.mock({
    res: 0,
    "data|5": [
      {
        completeNumber: 1,
        jumpPath: "test.joinhealth.cn/fu/79vP055HW",
        "jumpType|0-4": 2,
        "needNumber|0-1": 1,
        "taskType|1-9": 1,
        "normalFlag|1-2": 1,
        title: Mock.Random.ctitle(5, 10),
      },
    ],
  }),
};

module.exports = {
  home,
};
