// ----------------------------------------------------//
// Se crean las instancias de las librerias a utilizar //
// ----------------------------------------------------//
var modbus = require('jsmodbus');
var fs = require('fs'),
PubNub = require('pubnub');
try {
  //Asignar host, puerto y otros par ametros al cliente Modbus
  var client = modbus.client.tcp.complete({
    'host': "192.168.20.250",
    'port': 502,
    'autoReconnect': true,
    'timeout': 60000,
    'logEnabled': true,
    'reconnectTimeout': 30000
  }).connect();
  var clientW2 = modbus.client.tcp.complete({
    'host': "192.168.10.91",
    'port': 502,
    'autoReconnect': true,
    'timeout': 60000,
    'logEnabled': true,
    'reconnectTimeout': 30000
  }).connect();
  var clientW3 = modbus.client.tcp.complete({
    'host': "192.168.10.92",
    'port': 502,
    'autoReconnect': true,
    'timeout': 60000,
    'logEnabled': true,
    'reconnectTimeout': 30000
  }).connect();
  var lastReject,flagInfo2Send=0;
  var CasePackerOut = null;
  var timestarter = 0,testBath2,CPQOtestBath = 0,timestarter2 = 0, testBath3,CPQOtestBath2 = 0,intId;
  var CasePacker, CaseErector, CaseSealer, Capper, MonoBlock, GasFiller, Bundler, divXray, testBath, capCombiner, TableSuplier, Coder, Divider, checkWeigher;
  var timestop = 5,testBathCPQIant = 0,testBathCPQRant = 0,testBathCPQOant,inittestBath = 0,initxRay = 0,xRayCPQIant = 0,xRayCPQRant,xRayCPQOant;
  var flagONS1 = 0,
    flagONS2 = 0,
    flagONS3 = 0,
    flagONS4 = 0,
    flagONS5 = 0,
    flagONS6 = 0,
    flagONS7 = 0,
    flagONS8 = 0,
    flagONS9 = 0,
    flagONS10 = 0,
    flagONS11 = 0,
    flagONS12 = 0,
    flagONS13 = 0;
  var ctCasePacker = 0,
    actualCasePacker = 0,
    timeCasePacker = 0,
    stopCountCasePacker = 0,
    secCasePacker = 0,
    flagStopCasePacker = 0,
    stateCasePacker = 0,
    speedCasePacker = 0,
    speedTempCasePacker = 0,
    flagPrintCasePacker = 0;
  var ctCaseErector = 0,
    actualCaseErector = 0,
    timeCaseErector = 0,
    stopCountCaseErector = 0,
    secCaseErector = 0,
    flagStopCaseErector = 0,
    stateCaseErector = 0,
    speedCaseErector = 0,
    speedTempCaseErector = 0,
    flagPrintCaseErector = 0;
  var ctCaseSealer = 0,
    actualCaseSealer = 0,
    timeCaseSealer = 0,
    stopCountCaseSealer = 0,
    secCaseSealer = 0,
    flagStopCaseSealer = 0,
    stateCaseSealer = 0,
    speedCaseSealer = 0,
    speedTempCaseSealer = 0,
    flagPrintCaseSealer = 0;
  var ctCapper = 0,
    actualCapper = 0,
    timeCapper = 0,
    stopCountCapper = 0,
    secCapper = 0,
    flagStopCapper = 0,
    stateCapper = 0,
    speedCapper = 0,
    speedTempCapper = 0,
    flagPrintCapper = 0;
  var ctMonoBlock = 0,
    actualMonoBlock = 0,
    timeMonoBlock = 0,
    stopCountMonoBlock = 0,
    secMonoBlock = 0,
    flagStopMonoBlock = 0,
    stateMonoBlock = 0,
    speedMonoBlock = 0,
    speedTempMonoBlock = 0,
    flagPrintMonoBlock = 0;
  var ctGasFiller = 0,
    actualGasFiller = 0,
    timeGasFiller = 0,
    stopCountGasFiller = 0,
    secGasFiller = 0,
    flagStopGasFiller = 0,
    stateGasFiller = 0,
    speedGasFiller = 0,
    speedTempGasFiller = 0,
    flagPrintGasFiller = 0;
  var SamplesGasFiller = 0,
    RejGasFiller = 0,
    RejectGasFiller = 0;
  var ctBundler = 0,
    actualBundler = 0,
    timeBundler = 0,
    stopCountBundler = 0,
    secBundler = 0,
    flagStopBundler = 0,
    stateBundler = 0,
    speedBundler = 0,
    speedTempBundler = 0,
    flagPrintBundler = 0;
  var ctdivXray = 0,
    actualdivXray = 0,
    timedivXray = 0,
    stopCountdivXray = 0,
    secdivXray = 0,
    flagStopdivXray = 0,
    statedivXray = 0,
    speeddivXray = 0,
    speedTempdivXray = 0,
    flagPrintdivXray = 0;
  var cttestBath = 0,
    actualtestBath = 0,
    timetestBath = 0,
    stopCounttestBath = 0,
    sectestBath = 0,
    flagStoptestBath = 0,
    statetestBath = 0,
    speedtestBath = 0,
    speedTemptestBath = 0,
    flagPrinttestBath = 0;
  var ctcapCombiner = 0,
    actualcapCombiner = 0,
    timecapCombiner = 0,
    stopCountcapCombiner = 0,
    seccapCombiner = 0,
    flagStopcapCombiner = 0,
    statecapCombiner = 0,
    speedcapCombiner = 0,
    speedTempcapCombiner = 0,
    flagPrintcapCombiner = 0;
  var ctCoder = 0,
    actualCoder = 0,
    timeCoder = 0,
    stopCountCoder = 0,
    secCoder = 0,
    flagStopCoder = 0,
    stateCoder = 0,
    speedCoder = 0,
    speedTempCoder = 0,
    flagPrintCoder = 0;
  var ctDivider = 0,
    actualDivider = 0,
    timeDivider = 0,
    stopCountDivider = 0,
    secDivider = 0,
    flagStopDivider = 0,
    stateDivider = 0,
    speedDivider = 0,
    speedTempDivider = 0,
    flagPrintDivider = 0;
    var ChechWeigherct = null,
        ChechWeigherresults = null,
        CntInChechWeigher = null,
        CntOutChechWeigher = null,
        ChechWeigheractual = 0,
        ChechWeighertime = 0,
        ChechWeighersec = 0,
        ChechWeigherflagStopped = false,
        ChechWeigherstate = 0,
        ChechWeigherspeed = 0,
        ChechWeigherspeedTemp = 0,
        ChechWeigherflagPrint = 0,
        ChechWeighersecStop = 0,
        ChechWeigherdeltaRejected = null,
        ChechWeigherONS = false,
        ChechWeighertimeStop = 60, //NOTE: Timestop
        ChechWeigherWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
        ChechWeigherflagRunning = false,
        ChechWeigherRejectFlag = false,
        ChechWeigherReject,
        ChechWeigherVerify = (function(){
          try{
            ChechWeigherReject = fs.readFileSync('ChechWeigherRejected.json')
            if(ChechWeigherReject.toString().indexOf('}') > 0 && ChechWeigherReject.toString().indexOf('{\"rejected\":') != -1){
              ChechWeigherReject = JSON.parse(ChechWeigherReject)
            }else{
              throw 12121212
            }
          }catch(err){
            if(err.code == 'ENOENT' || err == 12121212){
              fs.writeFileSync('ChechWeigherRejected.json','{"rejected":0}') //NOTE: Change the object to what it usually is.
              ChechWeigherReject = {
                rejected : 0
              }
            }
          }
        })()
  var ctTableSuplier = 0,
    actualTableSuplier = 0,
    timeTableSuplier = 0,
    stopCountTableSuplier = 0,
    secTableSuplier = 0,
    flagStopTableSuplier = 0,
    stateTableSuplier = 0,
    speedTableSuplier = 0,
    speedTempTableSuplier = 0,
    flagPrintTableSuplier = 0;
  var valveSupply1, auxStatevalveSupply1 = 0,
    secvalveSupply1 = 0,
    timevalveSupply1 = 0;
  var valveSupply2, auxStatevalveSupply2 = 0,
    secvalveSupply2 = 0,
    timevalveSupply2 = 0;
  var valveCombiner, auxStatevalveCombiner = 0,
    secvalveCombiner = 0,
    timevalveCombiner = 0;
  var capSupply1, auxStatecapSupply1 = 0,
    seccapSupply1 = 0,
    timecapSupply1 = 0;
  var capSupply2, auxStatecapSupply2 = 0,
    seccapSupply2 = 0,
    timecapSupply2 = 0;
  var MonoBlockCanInlet = 0,
    MonoBlockVMnlet = 0,
    MonoBlockCanBackup = 0;
  var GasFillerCanInlet = 0,
    GasFillerCanBackup = 0;
  var testBathCanInlet = 0,
    testBathCanBackup = 0;
  var CasePackerBlock = 0,
    CasePackerWait1 = 0,
    CasePackerWait2 = 0,
    CasePackerWait3 = 0;
  var CaseSealerBlock = 0,
    CaseSealerWait = 0;
  var CaseErectorBlock = 0,
    CaseErector2 = 0;
  var CapperBlock = 0,
    CapperWait1 = 0,
    CapperWait2 = 0;
  var divXrayCanInlet = 0,
    divXrayCanBackup = 0;
  var vlvSupply1InletVatr = 0,
    vlvSupply1BackUpVatr = 0,
    vlvSupply1BackUpVaso = 0;
  var vlvSupply2InletVatr = 0,
    vlvSupply2BackUpVatr = 0,
    vlvSupply2BackUpVaso = 0;
  var vlvCombinerInlet1 = 0,
    vlvCombinerInlet2 = 0,
    vlvCombinerBackUp = 0;
  var capSupply1BackUpCaso = 0,
    capSupply2BackUpCaso = 0;
  var capCombinerInlet1 = 0,
    capCombinerInlet2 = 0,
    capCombinercapperBackUp = 0;
  var BundlerBlock = 0,
    BundlerWait = 0;
  var MonoBlockBitState, CapperBitState, GasFillerBitState, CaseSealerBitState, CaseSealerBitState1, CaseErectorBitState, CasePackerBitState, BundlerBitState;
  var divXrayBitState, testBathBitState, capCombinerBitState, CoderBitState, capSupply1BitState, capSupply2BitState;
  var valveSupply1BitState, valveSupply2BitState, valveCombinerBitState;
  var CoderBlock = 0,
    CoderWait = 0,
    capSupply1Block = 0,
    capSupply2Block;
  var valveSupply1Wait = 0,
    valveSupply1Block1 = 0,
    valveSupply1Block2 = 0;
  var valveSupply2Wait = 0,
    valveSupply2Block1 = 0,
    valveSupply2Block2 = 0;
  var valveCombinerWait1 = 0,
    valveCombinerWait2 = 0,
    valveCombinerBlock = 0;
  var stopCountcapSupply2 = 0,
    flagStopcapSupply2 = 0,
    flagPrintcapSupply2 = 0,
    statecapSupply2 = 0;
  var stopCountcapSupply1 = 0,
    flagStopcapSupply1 = 0,
    flagPrintcapSupply1 = 0,
    statecapSupply1 = 0;
  var stopCountvalveSupply1 = 0,
    flagStopvalveSupply1 = 0,
    flagPrintvalveSupply1 = 0,
    statevalveSupply1 = 0;
  var stopCountvalveSupply2 = 0,
    flagStopvalveSupply2 = 0,
    flagPrintvalveSupply2 = 0,
    statevalveSupply2 = 0;
  var stopCountvalveCombiner = 0,
    flagStopvalveCombiner = 0,
    flagPrintvalveCombiner = 0,
    statevalveCombiner = 0;
  var auxStatecapSupply2 = 0,
    valveSupply2Blocksec = 0;
  var DividerBitStatem, DividerBlock = 0,
    DividerWait = 0,
    dataBitsDivider, testBathStatus = 0;
  /*var checkWeigherBitStatem, checkWeigherBlock = 0,
    checkWeigherWait = 0,
    dataBitscheckWeigher;*/
  var temptimeTableSuplier = 0,
    temptimecapCombiner = 0,
    temptimeCoder = 0,
    temptimedivXray = 0,
    temptimevalveCombiner = 0,
    temptimeBundler = 0,
    temptimeGasFiller = 0,
    temptimeMonoBlock = 0,
    temptimeCapper = 0,
    temptimetestBath = 0,
    temptimeCaseErector = 0,
    temptimeCasePacker = 0,
    temptimeCaseSealer = 0;
  var CntOutXray = 0,
    CntOuttestBath = 0,
    CntInXray = 0,
    CntIntestBath = 0,
    CntEOL = 0,
    //CntOutChechWeigher = 0,
    CntOutBundler = 0,
    CntOutDivider = 0;
  var //checkWeigherTempReject = 0,
    CapperTempReject = 0,
    CaseSealerTempReject = 0,
    GasFillerTempReject = 0;
  var antCPQItb = 0,
    antCPQIdx = 0,
    tempRestTb = 0,
    cntQRXray = 0;
  //  var speedcheckWeigher1;
    var secPubNub=60*4+55;
    var publishConfig;
    var testBathct = null,
        testBathresults = null,
        testBathactual = 0,
        testBathtime = 0,
        testBathsec = 0,
        testBathflagStopped = false,
        testBathstate = 0,
        testBathspeed = 0,
        testBathspeedTemp = 0,
        testBathflagPrint = 0,
        testBathsecStop = 0,
        testBathdeltaRejected = null,
        testBathONS = 0,
        testBathStartTime = null,
        testBathtimeStop = 30, //NOTE: Timestop
        testBathWorktime = 60, //NOTE: 60 si la máquina trabaja continuamente, 3 sí tarda entre 40 y 60 segundos en "operar"
        testBathflagRunning = false,
        testBathRejectFlag = false,
        testBathReject;
        var Xrayct = null,
            Xrayresults = null,
            Xrayactual = 0,
            Xraytime = 0,
            Xraysec = 0,
            XrayflagStopped = false,
            Xraystate = 0,
            Xrayspeed = 0,
            XrayspeedTemp = 0,
            XrayflagPrint = 0,
            XraysecStop = 0,
            XraydeltaRejected = null,
            XrayONS = 0,
            XrayStartTime = null,
            XraytimeStop = 30, //NOTE: Timestop
            XrayWorktime = 60, //NOTE: 60 si la máquina trabaja continuamente, 3 sí tarda entre 40 y 60 segundos en "operar"
            XrayflagRunning = false,
            XrayRejectFlag = false,
            XrayReject;
            var intIdW1,
            intIdW2,
            intIdW3;
var files = fs.readdirSync("C:/PULSE/AM_L1/L1_LOGS/"); //Leer documentos
var actualdate = Date.now(); //Fecha actual
var text2send=[];//Vector a enviar
var capCombinerBackUp=null;
var i=0;


   var pubnub = new PubNub({
      publishKey : "pub-c-8d024e5b-23bc-4ce8-ab68-b39b00347dfb",
      subscribeKey : "sub-c-c3b3aa54-b44b-11e7-895e-c6a8ff6a3d85",
      uuid: "aero1-0000-1234"
    });
    var testBathVerify = function(){
          try{
            testBathReject = fs.readFileSync('testBathRejected.json');
            if(testBathReject.toString().indexOf('}') > 0 && testBathReject.toString().indexOf('{\"rejected\":') != -1){
              testBathReject = JSON.parse(testBathReject);
            }else{
              throw 12121212;
            }
          }catch(err){
            if(err.code == 'ENOENT' || err == 12121212){
              fs.writeFileSync('testBathRejected.json','{"rejected":0}'); //NOTE: Change the object to what it usually is.
              testBathReject = {
                rejected : 0
              };
            }
          }
        };

    testBathVerify();

    var XrayVerify = function(){
          try{
            XrayReject = fs.readFileSync('XrayRejected.json');
            if(XrayReject.toString().indexOf('}') > 0 && XrayReject.toString().indexOf('{\"rejected\":') != -1){
              XrayReject = JSON.parse(XrayReject);
            }else{
              throw 12121212;
            }
          }catch(err){
            if(err.code == 'ENOENT' || err == 12121212){
              fs.writeFileSync('XrayRejected.json','{"rejected":0}'); //NOTE: Change the object to what it usually is.
              XrayReject = {
                rejected : 0
              };
            }
          }
        };

    XrayVerify();
    var senderData=function(){
      pubnub.publish(publishConfig, function(status, response) {
    });};
  //var Coder, auxStateCoder=0,secCoder=0,timeCoder=0;
  // --------------------------------------------------------- //
  //Función que realiza las instrucciones de lectura de datos  //
  // --------------------------------------------------------- //
  /*clientW1.on('connect', function(err) {
    intIdW1 = setInterval(function(){
      clientW1.readHoldingRegisters(0, 10).then(function(resp) {
        CntOutBundler = joinWord(resp.register[0], resp.register[1])+joinWord(resp.register[2], resp.register[3])+joinWord(resp.register[4], resp.register[5])+joinWord(resp.register[6], resp.register[7]);
      });
    }, 1000);
  });*/
  clientW2.on('connect', function(err) {
    intIdW2 = setInterval(function(){
      clientW2.readHoldingRegisters(0, 10).then(function(resp) {
        CntInXray = joinWord(resp.register[0], resp.register[1]);
        CntOutXray = joinWord(resp.register[2], resp.register[3]);
        CntIntestBath = joinWord(resp.register[4], resp.register[5]);
        CntOuttestBath = joinWord(resp.register[6], resp.register[7]);
        //------------------------------------------Xray----------------------------------------------
            Xrayct =  CntOutXray; //NOTE: Igualar al contador de salida
            if (XrayONS == 0 && Xrayct) {
              XrayspeedTemp = Xrayct;
              XrayONS = 1;
            }
            if(Xrayct > Xrayactual){
              if(XrayflagStopped){
                Xrayspeed = Xrayct -XrayspeedTemp;
                XrayspeedTemp = Xrayct;
                Xraysec = 0;
              }
              XraysecStop = 0;
              Xraysec++;
              Xraytime = Date.now();
              Xraystate = 1;
              XrayflagStopped = false;
              XrayflagRunning = true;
            } else if( Xrayct == Xrayactual ){
              if(XraysecStop == 0){
                Xraytime = Date.now();
              }
              XraysecStop++;
              if(XraysecStop >= XraytimeStop){
                Xrayspeed = 0;
                Xraystate = 2;
                XrayspeedTemp = Xrayct;
                XrayflagStopped = true;
                XrayflagRunning = false;
                //console.log(CntInXray - CntOutXray);
                //console.log(XrayReject.rejected);
                if(CntInXray - CntOutXray > 0 && CntInXray - CntOutXray > XrayReject.rejected)
                  XrayReject.rejected = CntInXray - CntOutXray;
              }
              if(XraysecStop%XraytimeStop*3 == 0 ||XraysecStop == XraytimeStop ){
                XrayflagPrint=1;

                if(XraysecStop%XraytimeStop*3 == 0){
                  Xraytime = Date.now();
                }
              }
            }
            Xrayactual = Xrayct;
            if(Xraysec == XrayWorktime){
              Xraysec = 0;
              if(XrayflagRunning && Xrayct){
                XrayflagPrint = 1;
                XraysecStop = 0;
                Xrayspeed = Xrayct - XrayspeedTemp;
                XrayspeedTemp = Xrayct;
              }
            }
            if (Xraystate == 2) {
              if (divXrayCanBackup == 1) {
                Xraystate = 4;
              } else {
                if (divXrayCanInlet == 1) {
                  Xraystate = 3;

                }
              }
            }
            if(CntOutXray != null){
              Xrayresults = {
                ST: Xraystate,
                CPQI: CntInXray,//NOTE: Igualar al contador de salida
                CPQO: CntOutXray,//NOTE: Igualar al contador de salida
                CPQR: XrayReject.rejected,
                SP: Xrayspeed
              };
            }else if(CntOutXray == null){
              Xrayresults = {
                ST: Xraystate,
                CPQI: null,
                CPQO: CntOutXray,//NOTE: Igualar al contador de salida
                CPQR: null,
                SP: Xrayspeed
              };
            }


            if (XrayflagPrint == 1 && Xrayct) {
              fs.writeFileSync('XrayRejected.json',JSON.stringify(XrayReject));
              for (var key in Xrayresults) {
                if(Xrayresults[key]!=null&&!isNaN(Xrayresults[key]))
                //NOTE: Cambiar Path
                fs.appendFileSync('C:/PULSE/AM_L1/L1_LOGS/mex_cue_divXray_l1.log', 'tt=' + Xraytime + ',var=' + key + ',val=' + Xrayresults[key] + '\n');
              }
              XrayflagPrint = 0;
            }

        //------------------------------------------Xray----------------------------------------------
        //------------------------------------------testBath----------------------------------------------
        testBathct =  CntIntestBath; //NOTE: Igualar al contador de salida
        if (testBathONS == 0 && testBathct) {
          testBathspeedTemp = testBathct;
          testBathONS = 1;
        }
        if(testBathct > testBathactual){
          if(testBathflagStopped){
            testBathspeed = testBathct -testBathspeedTemp;
            testBathspeedTemp = testBathct;
            testBathsec = 0;
          }
          testBathsecStop = 0;
          testBathsec++;
          testBathtime = Date.now();
          testBathstate = 1;
          testBathflagStopped = false;
          testBathflagRunning = true;
        } else if( testBathct == testBathactual ){
          if(testBathsecStop == 0){
            testBathtime = Date.now();
          }
          testBathsecStop++;
          if(testBathsecStop >= testBathtimeStop){
            testBathspeed = 0;
            testBathstate = 2;
            testBathspeedTemp = testBathct;
            testBathflagStopped = true;
            testBathflagRunning = false;
            if (testBathCanBackup == 1) {
              testBathstate = 4;

            } else if (testBathCanInlet == 1) {
              testBathstate = 3;
            }
            if(CntIntestBath - CntOuttestBath > 0 && CntIntestBath - CntOuttestBath > testBathReject.rejected)
              testBathReject.rejected = CntIntestBath - CntOuttestBath;
          }
          if(testBathsecStop%testBathtimeStop*3 == 0 ||testBathsecStop == testBathtimeStop ){
            testBathflagPrint=1;

            if(testBathsecStop%testBathtimeStop*3 == 0){
              testBathtime = Date.now();
            }
          }
        }
        testBathactual = testBathct;
        if(testBathsec == testBathWorktime){
          testBathsec = 0;
          if(testBathflagRunning && testBathct){
            testBathflagPrint = 1;
            testBathsecStop = 0;
            testBathspeed = testBathct - testBathspeedTemp;
            testBathspeedTemp = testBathct;
          }
        }

        if(CntOuttestBath != null){
          testBathresults = {
            ST: testBathstate,
            CPQI: CntIntestBath,// + testBathReject.rejected,//NOTE: Igualar al contador de salida
            CPQO: CntOuttestBath,//NOTE: Igualar al contador de salida
            CPQR: testBathReject.rejected,
            SP: testBathspeed
          };
        }else if(CntOuttestBath == null){
          testBathresults = {
            ST: testBathstate,
            CPQI: null,
            CPQO: CntOuttestBath,//NOTE: Igualar al contador de salida
            CPQR: null,
            SP: testBathspeed
          };
        }
        if (testBathflagPrint == 1 && testBathct) {
          fs.writeFileSync('testBathRejected.json',JSON.stringify(testBathReject));
          for (var key in testBathresults) {
            if(testBathresults[key]!=null&&!isNaN(testBathresults[key]))
            //NOTE: Cambiar Path
            fs.appendFileSync('C:/PULSE/AM_L1/L1_LOGS/mex_cue_testBath_l1.log', 'tt=' + testBathtime + ',var=' + key + ',val=' + testBathresults[key] + '\n');
          }
          testBathflagPrint = 0;
        }
        //------------------------------------------testBath----------------------------------------------
      });
    }, 1000);
  });
  clientW3.on('connect', function(err) {
    intIdW3 = setInterval(function(){
      clientW3.readHoldingRegisters(0, 10).then(function(resp) {
        CntEOL = joinWord(resp.register[4], resp.register[5]);
        CntInChechWeigher = CaseSealer.CPQO;
        CntOutChechWeigher = joinWord(resp.register[0], resp.register[1]);
        //------------------------------------------ChechWeigher----------------------------------------------
              ChechWeigherct = CntOutChechWeigher // NOTE: igualar al contador de salida
              if (!ChechWeigherONS && ChechWeigherct) {
                ChechWeigherspeedTemp = ChechWeigherct
                ChechWeighersec = Date.now()
                ChechWeigherONS = true
                ChechWeighertime = Date.now()
              }
              if(ChechWeigherct > ChechWeigheractual){
                if(ChechWeigherflagStopped){
                  ChechWeigherspeed = ChechWeigherct - ChechWeigherspeedTemp
                  ChechWeigherspeedTemp = ChechWeigherct
                  ChechWeighersec = Date.now()
                  ChechWeigherdeltaRejected = null
                  ChechWeigherRejectFlag = false
                  ChechWeighertime = Date.now()
                }
                ChechWeighersecStop = 0
                ChechWeigherstate = 1
                ChechWeigherflagStopped = false
                ChechWeigherflagRunning = true
              } else if( ChechWeigherct == ChechWeigheractual ){
                if(ChechWeighersecStop == 0){
                  ChechWeighertime = Date.now()
                  ChechWeighersecStop = Date.now()
                }
                if( ( Date.now() - ( ChechWeighertimeStop * 1000 ) ) >= ChechWeighersecStop ){
                  ChechWeigherspeed = 0
                  ChechWeigherstate = 2
                  ChechWeigherspeedTemp = ChechWeigherct
                  ChechWeigherflagStopped = true
                  ChechWeigherflagRunning = false
                  if(CntInChechWeigher - CntOutChechWeigher - ChechWeigherReject.rejected != 0 && ! ChechWeigherRejectFlag){
                    ChechWeigherdeltaRejected = CntInChechWeigher - CntOutChechWeigher - ChechWeigherReject.rejected
                    ChechWeigherReject.rejected = CntInChechWeigher - CntOutChechWeigher
                    fs.writeFileSync('ChechWeigherRejected.json','{"rejected": ' + ChechWeigherReject.rejected + '}')
                    ChechWeigherRejectFlag = true
                  }else{
                    ChechWeigherdeltaRejected = null
                  }
                  ChechWeigherflagPrint = 1
                }
              }
              ChechWeigheractual = ChechWeigherct
              if(Date.now() - 60000 * ChechWeigherWorktime >= ChechWeighersec && ChechWeighersecStop == 0){
                if(ChechWeigherflagRunning && ChechWeigherct){
                  ChechWeigherflagPrint = 1
                  ChechWeighersecStop = 0
                  ChechWeigherspeed = ChechWeigherct - ChechWeigherspeedTemp
                  ChechWeigherspeedTemp = ChechWeigherct
                  ChechWeighersec = Date.now()
                }
              }
              ChechWeigherresults = {
                ST: ChechWeigherstate,
                CPQI : CntInChechWeigher,
                CPQO : CntOutChechWeigher,
                CPQR : ChechWeigherdeltaRejected,
                SP: ChechWeigherspeed
              }
              if (ChechWeigherflagPrint == 1) {
                for (var key in ChechWeigherresults) {
                  if( ChechWeigherresults[key] != null && ! isNaN(ChechWeigherresults[key]) )
                  //NOTE: Cambiar path
                  fs.appendFileSync('C:/PULSE/AM_L1/L1_LOGS/mex_cue_checkWeigher_l1.log', 'tt=' + ChechWeighertime + ',var=' + key + ',val=' + ChechWeigherresults[key] + '\n')
                }
                ChechWeigherflagPrint = 0
                ChechWeighersecStop = 0
                ChechWeighertime = Date.now()
              }
        //------------------------------------------ChechWeigher----------------------------------------------
      });
    }, 1000);
  });
   client.on('connect', function(err) {
    setInterval(function() {
    if(secPubNub>=60*5){
      secPubNub=0;
      idle();
      publishConfig = {
        channel : "Cue_Aero_Monitor",
        message : {
              line: "Aero1",
              tt: Date.now(),
              machines: text2send
          }
      };
      senderData();
    }else{
      secPubNub++;
    }
      DoRead();
    }, 1000);
  });
  var DoRead=function() {
    client.readHoldingRegisters(200, 50).then(function(resp) {
      dataBitsDivider = DataBits(resp.register[20], resp.register[21]);
      //console.log("Divider Bits: "+dataBitsDivider);
      ctDivider = joinWord(resp.register[22], resp.register[23]);
      if (flagONS11 == 0) {
        speedTempDivider = ctDivider;
        flagONS11 = 1;
      }
      if (secDivider >= 60) {
        if (stopCountDivider == 0 || flagStopDivider == 1) {
          flagPrintDivider = 1;
          secDivider = 0;
          speedDivider = ctDivider - speedTempDivider;
          speedTempDivider = ctDivider;
        }
        if (flagStopDivider == 1) {
          timeDivider = Date.now();
        }
      }
      secDivider++;
      if (ctDivider > actualDivider) {
        stateDivider = 1; //RUN
        if (stopCountDivider >= 25) {
          speedDivider = (ctDivider - speedTempDivider);
          flagPrintDivider = 1;
          secDivider = 0;
        }
        timeDivider = Date.now();
        stopCountDivider = 0;
        flagStopDivider = 0;
      } else if (ctDivider == actualDivider && secDivider != 0) {
        if (stopCountDivider == 0) {
          timeDivider = Date.now();
        }
        stopCountDivider++;
        if (stopCountDivider >= 25) {
          stateDivider = 2; //STOP
          speedDivider = 0;
          if (flagStopDivider == 0) {
            flagPrintDivider = 1;
            secDivider = 0;
          }
          flagStopDivider = 1;
        }
      }
      if (stateDivider == 2) {
        speedTempDivider = ctDivider;
      }

      actualDivider = ctDivider;
      if (stateDivider == 2) {
        if (dataBitsDivider[31] == 1 && dataBitsDivider[28] == 1) {
          stateDivider = 4;
        } else {
          if (dataBitsDivider[30] == 1 && dataBitsDivider[28] == 1) {
            stateDivider = 3;
          }
        }
      }
      Divider = {
        ST: stateDivider,
        CPQI: joinWord(resp.register[22], resp.register[23]), //Counter Product Quantity In
        CPQO: joinWord(resp.register[22], resp.register[23]), //CntOutDivider,//Counter Product Quantity Out
        SP: speedDivider
      };
      //console.log("Datos divider: "+Divider);
      if (flagPrintDivider == 1) {
        for (var key in Divider) {
          fs.appendFileSync("C:/PULSE/AM_L1/L1_LOGS/mex_cue_Divider_l1.log", "tt=" + timeDivider + ",var=" + key + ",val=" + Divider[key] + "\n");
        }
        flagPrintDivider = 0;
      }
    });
    client.readHoldingRegisters(500, 10).then(function(resp) {
      CoderBitState = DataBits(resp.register[0], resp.register[1]);
      CoderBlock = CoderBitState[13];
      CoderWait = CoderBitState[15];
    });
    client.readHoldingRegisters(750, 20).then(function(resp) {
      ctCoder = joinWord(resp.register[2], resp.register[3]);
      if (flagONS9 === 0) {
        speedTempCoder = ctCoder;
        flagONS9 = 1;
      }
      if (secCoder >= 60) {
        if (stopCountCoder == 0 || flagStopCoder == 1) {
          flagPrintCoder = 1;
          secCoder = 0;
          speedCoder = ctCoder - speedTempCoder;
          speedTempCoder = ctCoder;
        }
        if (flagStopCoder == 1) {
          timeCoder = Date.now();
        }
      }
      secCoder++;
      if (ctCoder > actualCoder) {
        stateCoder = 1; //RUN
        if (stopCountCoder >= 25) {
          speedCoder = (ctCoder - speedTempCoder);
          flagPrintCoder = 1;
          secCoder = 0;
        }
        timeCoder = Date.now();
        stopCountCoder = 0;
        flagStopCoder = 0;
      } else if (ctCoder == actualCoder && secCoder !== 0) {
        if (stopCountCoder === 0) {
          timeCoder = Date.now();
        }
        stopCountCoder++;
        if (stopCountCoder >= 25) {
          stateCoder = 2; //STOP
          speedCoder = 0;
          if (flagStopCoder === 0) {
            flagPrintCoder = 1;
            secCoder = 0;
          }
          flagStopCoder = 1;
        }
      }
      if (stateCoder == 2) {
        speedTempCoder = ctCoder;
      }

      actualCoder = ctCoder;
      if (stateCoder == 2) {
        if (CoderBlock == 1) {
          stateCoder = 4;
        } else {
          if (CoderWait == 1) {
            stateCoder = 3;
          }
        }
      }
      Coder = {
        ST: stateCoder,
        CPQI: joinWord(resp.register[2], resp.register[3]), //Counter Product Quantity In
        CPQO: joinWord(resp.register[2], resp.register[3]), //Counter Product Quantity Out
        SP: speedCoder,
      };
      if (Coder.CPQI < 1 || Coder.CPQO < 1) {
        flagPrintCoder = 0;
      }
      if (flagPrintCoder == 1) {
        if (timeCoder == temptimeCoder) {
          timeCoder = Date.now();
        }
        for (var key in Coder) {
          fs.appendFileSync("C:/PULSE/AM_L1/L1_LOGS/mex_cue_Coder_l1.log", "tt=" + timeCoder + ",var=" + key + ",val=" + Coder[key] + "\n");
        }
        flagPrintCoder = 0;
        temptimeCoder = timeCoder;
      }
    });
    client.readHoldingRegisters(1150, 10).then(function(resp) {
      capCombinerBitState = DataBits(resp.register[0], resp.register[1]);
      capCombinerBackUp = capCombinerBitState[13];
      capCombinerInlet1 = capCombinerBitState[15];
      capCombinerInlet2 = capCombinerBitState[14];
    });
    client.readHoldingRegisters(750, 10).then(function(resp) {
      ctTableSuplier = joinWord(resp.register[2], resp.register[3]);
      if (flagONS10 === 0) {
        speedTempTableSuplier = ctTableSuplier;
        flagONS10 = 1;
      }
      if (secTableSuplier >= 60) {
        if (stopCountTableSuplier === 0 || flagStopTableSuplier == 1) {
          flagPrintTableSuplier = 1;
          secTableSuplier = 0;
          speedTableSuplier = ctTableSuplier - speedTempTableSuplier;
          speedTempTableSuplier = ctTableSuplier;
        }
        if (flagStopTableSuplier == 1) {
          timeTableSuplier = Date.now();
        }
      }
      secTableSuplier++;
      if (ctTableSuplier > actualTableSuplier) {
        stateTableSuplier = 1; //RUN
        if (stopCountTableSuplier >= 25) {
          speedTableSuplier = (ctTableSuplier - speedTempTableSuplier);
          flagPrintTableSuplier = 1;
          secTableSuplier = 0;
        }
        timeTableSuplier = Date.now();
        stopCountTableSuplier = 0;
        flagStopTableSuplier = 0;
      } else if (ctTableSuplier == actualTableSuplier && secTableSuplier !== 0) {
        if (stopCountTableSuplier === 0) {
          timeTableSuplier = Date.now();
        }
        stopCountTableSuplier++;
        if (stopCountTableSuplier >= 25) {
          stateTableSuplier = 2; //STOP
          speedTableSuplier = 0;
          if (flagStopTableSuplier === 0) {
            flagPrintTableSuplier = 1;
            secTableSuplier = 0;
          }
          flagStopTableSuplier = 1;
        }
      }
      if (stateTableSuplier == 2) {
        speedTempTableSuplier = ctTableSuplier;
      }
      actualTableSuplier = ctTableSuplier;
      if (stateTableSuplier == 2) {
        if (Coder.ST == 2 || Coder.ST == 4) {
          stateTableSuplier = 4;
        } else if (Coder.ST == 3) {
          stateTableSuplier = 2;
        }
      }

      TableSuplier = {
        ST: stateTableSuplier
      };

      if (flagPrintTableSuplier == 1) {
        if (timeTableSuplier == temptimeTableSuplier) {
          timeTableSuplier = Date.now();
        }
        for (var key in TableSuplier) {
          fs.appendFileSync("C:/PULSE/AM_L1/L1_LOGS/mex_cue_TableSuplier_l1.log", "tt=" + timeTableSuplier + ",var=" + key + ",val=" + TableSuplier[key] + "\n");
        }
        flagPrintTableSuplier = 0;
        temptimeTableSuplier = timeTableSuplier;
      }
    });
    client.readHoldingRegisters(1200, 10).then(function(resp) {
      ctcapCombiner = joinWord(resp.register[2], resp.register[3]);
      if (flagONS9 === 0) {
        speedTempcapCombiner = ctcapCombiner;
        flagONS9 = 1;
      }
      if (seccapCombiner >= 60) {
        if (stopCountcapCombiner == 0 || flagStopcapCombiner == 1) {
          flagPrintcapCombiner = 1;
          seccapCombiner = 0;
          speedcapCombiner = ctcapCombiner - speedTempcapCombiner;
          speedTempcapCombiner = ctcapCombiner;
        }
        if (flagStopcapCombiner == 1) {
          timecapCombiner = Date.now();
        }
      }
      seccapCombiner++;
      if (ctcapCombiner > actualcapCombiner) {
        statecapCombiner = 1; //RUN
        if (stopCountcapCombiner >= 25) { //timestop
          speedcapCombiner = (ctcapCombiner - speedTempcapCombiner);
          flagPrintcapCombiner = 1;
          seccapCombiner = 0;
        }
        timecapCombiner = Date.now();
        stopCountcapCombiner = 0;
        flagStopcapCombiner = 0;
      } else if (ctcapCombiner == actualcapCombiner && seccapCombiner != 0) {
        if (stopCountcapCombiner == 0) {
          timecapCombiner = Date.now();
        }
        stopCountcapCombiner++;
        if (stopCountcapCombiner >= 25) { //timesstop
          statecapCombiner = 2; //STOP
          speedcapCombiner = 0;
          if (flagStopcapCombiner === 0) {
            flagPrintcapCombiner = 1;
            seccapCombiner = 0;
          }
          flagStopcapCombiner = 1;
        }
      }
      if (statecapCombiner == 2) {
        speedTempcapCombiner = ctcapCombiner;
      }
      actualcapCombiner = ctcapCombiner;
      if (statecapCombiner == 2) {
        if (capCombinerBackUp == 1) {
          statecapCombiner = 4;
        } else {
          if (capCombinerInlet1 == 1 || capCombinerInlet2 == 1) {
            statecapCombiner = 3;
          }
        }
      }
      capCombiner = {
        ST: statecapCombiner,
        CPQI: joinWord(resp.register[2], resp.register[3]), //Counter Product Quantity In
      };
      if (capCombiner.CPQI < 1) {
        flagPrintcapCombiner = 0;
      }
      if (flagPrintcapCombiner == 1) {
        if (timecapCombiner == temptimecapCombiner) {
          timecapCombiner = Date.now();
        }

        for (var key in capCombiner) {
          fs.appendFileSync("C:/PULSE/AM_L1/L1_LOGS/mex_cue_capCombiner_l1.log", "tt=" + timecapCombiner + ",var=" + key + ",val=" + capCombiner[key] + "\n");
        }
        flagPrintcapCombiner = 0;
        temptimecapCombiner = timecapCombiner;
      }
    });

    client.readHoldingRegisters(400, 40).then(function(resp) {
      CapperBitState = DataBits(resp.register[8], resp.register[9]);
      CapperBlock = CapperBitState[3];
      CapperWait1 = CapperBitState[0];
      CapperWait2 = CapperBitState[4];
      ctCapper = joinWord(resp.register[4], resp.register[5]);
      if (flagONS4 === 0) {
        speedTempCapper = ctCapper;
        flagONS4 = 1;
      }
      if (secCapper >= 60) {
        if (stopCountCapper === 0 || flagStopCapper == 1) {
          flagPrintCapper = 1;
          secCapper = 0;
          speedCapper = ctCapper - speedTempCapper;
          speedTempCapper = ctCapper;
        }
        if (flagStopCapper == 1) {
          timeCapper = Date.now();
        }
      }
      secCapper++;
      if (ctCapper > actualCapper) {
        stateCapper = 1; //RUN
        if (stopCountCapper >= 15) { //tiemstop
          speedCapper = (ctCapper - speedTempCapper);
          flagPrintCapper = 1;
          secCapper = 0;
        }
        timeCapper = Date.now();
        stopCountCapper = 0;
        flagStopCapper = 0;
      } else if (ctCapper == actualCapper && secCapper !== 0) {
        if (stopCountCapper === 0) {
          timeCapper = Date.now();
        }
        stopCountCapper++;
        if (stopCountCapper >= 15) { //timestop
          stateCapper = 2; //STOP
          speedCapper = 0;
          if (flagStopCapper === 0) {
            flagPrintCapper = 1;
            secCapper = 0;
          }
          flagStopCapper = 1;
        }
      }
      if (stateCapper == 2) {
        speedTempCapper = ctCapper;
      }

      actualCapper = ctCapper;
      if (stateCapper == 2) {
        if (CapperBlock == 1) {
          stateCapper = 4;
        } else {
          if (CapperWait1 == 1 || CapperWait2 == 1) {
            stateCapper = 3;
          }
        }
	        if (joinWord(resp.register[6], resp.register[7]) >= 0) {
	        	CapperTempReject = joinWord(resp.register[6], resp.register[7]);
	      	}else{
	      		CapperTempReject=0;
	      	}
      }

      Capper = {
        ST: stateCapper,
        CPQI: joinWord(resp.register[30], resp.register[31]), //Counter Product Quantity In
        CPQO: joinWord(resp.register[30], resp.register[31])-CapperTempReject, //Counter Product Quantity Out
        CPQR: CapperTempReject, //Counter Product Quantity Reject
        SP: speedCapper
      };
      //console.log(CapperTempReject);

      if (Capper.CPQI < 1 || Capper.CPQO < 1 || Capper.CPQR < 0) {
        flagPrintCapper = 0;
      }
      //console.log("Rej: "+Capper.CPQI +"++" +Capper.CPQO);
      if (flagPrintCapper == 1) {
        if (timeCapper == temptimeCapper) {
          timeCapper = Date.now();
        }
        for (var key in Capper) {
          fs.appendFileSync("C:/PULSE/AM_L1/L1_LOGS/mex_cue_Capper_l1.log", "tt=" + timeCapper + ",var=" + key + ",val=" + Capper[key] + "\n");
        }
        flagPrintCapper = 0;
        temptimeCapper = timeCapper;
      }

    });
    client.readHoldingRegisters(950, 30).then(function(resp) {
      testBathBitState = DataBits(resp.register[0], resp.register[1]);
      //console.log("Bit State:"+testBathBitState);
      testBathCanInlet = testBathBitState[31];
      testBathCanBackup = testBathBitState[29];
    });
    client.readHoldingRegisters(850, 10).then(function(resp) {
      divXrayBitState = DataBits(resp.register[0], resp.register[1]);
      divXrayCanInlet = divXrayBitState[15];
      divXrayCanBackup = divXrayBitState[13];
    });

    client.readHoldingRegisters(700, 10).then(function(resp) {

      valveCombinerBitState = DataBits(resp.register[0], resp.register[1]);
      valveCombinerWait1 = valveCombinerBitState[15];
      valveCombinerWait2 = valveCombinerBitState[14];
      valveCombinerBlock = valveCombinerBitState[13];
    });
    client.readHoldingRegisters(720, 10).then(function(resp) {
      var States = joinWord(resp.register[0], 0);
      if (secvalveCombiner >= 60) {
        if (stopCountvalveCombiner == 0 || flagStopvalveCombiner == 1) {
          flagPrintvalveCombiner = 1;
          secvalveCombiner = 0;
        }
        if (flagStopvalveCombiner == 1) {
          timevalveCombiner = Date.now();
        }
      }
      secvalveCombiner++;
      if (States == 3) {
        statevalveCombiner = 1; //RUN
        if (stopCountvalveCombiner >= 25) {
          flagPrintvalveCombiner = 1;
          secvalveCombiner = 0;
        }
        timevalveCombiner = Date.now();
        stopCountvalveCombiner = 0;
        flagStopvalveCombiner = 0;
      } else {
        if (States != 3) {
          if (stopCountvalveCombiner === 0) {
            timevalveCombiner = Date.now();
          }
          stopCountvalveCombiner++;
          if (stopCountvalveCombiner >= 25) {
            statevalveCombiner = 2; //STOP
            if (flagStopvalveCombiner === 0) {
              flagPrintvalveCombiner = 1;
              secvalveCombiner = 0;
            }
            flagStopvalveCombiner = 1;
          }
        }
      }
      if (statevalveCombiner == 2) {
        if (valveCombinerWait1 == 1 && valveCombinerWait2 == 1) {
          statevalveCombiner = 3;
        } else {
          if (valveCombinerBlock == 1) {
            statevalveCombiner = 4;
          }
        }
      }
      valveCombiner = {
        ST: statevalveCombiner //State Machine
      };
      if (flagPrintvalveCombiner == 1) {
        if (timevalveCombiner == temptimevalveCombiner) {
          timevalveCombiner = Date.now();
        }
        for (var key in valveCombiner) {
          fs.appendFileSync("C:/PULSE/AM_L1/L1_LOGS/mex_cue_valveCombiner_l1.log", "tt=" + timevalveCombiner + ",var=" + key + ",val=" + valveCombiner[key] + "\n");
        }
        flagPrintvalveCombiner = 0;
        temptimevalveCombiner = timevalveCombiner;
      }

    });

    client.readHoldingRegisters(300, 10).then(function(resp) {
      BundlerBitState = DataBits(resp.register[0], resp.register[1]);
      BundlerBlock = BundlerBitState[28];
      BundlerWait = BundlerBitState[29];
      ctBundler = joinWord(resp.register[2], resp.register[3]);
      if (flagONS7 === 0) {
        speedTempBundler = ctBundler;
        flagONS7 = 1;
      }
      if (secBundler >= 60) {
        if (stopCountBundler === 0 || flagStopBundler == 1) {
          flagPrintBundler = 1;
          secBundler = 0;
          speedBundler = ctBundler - speedTempBundler;
          speedTempBundler = ctBundler;
        }
        if (flagStopBundler == 1) {
          timeBundler = Date.now();
        }
      }
      secBundler++;
      if (ctBundler > actualBundler) {
        stateBundler = 1; //RUN
        if (stopCountBundler >= 25) {
          speedBundler = (ctBundler - speedTempBundler);
          flagPrintBundler = 1;
          secBundler = 0;
        }
        timeBundler = Date.now();
        stopCountBundler = 0;
        flagStopBundler = 0;


      } else if (ctBundler == actualBundler && secBundler != 0) {
        if (stopCountBundler == 0) {
          timeBundler = Date.now();
        }
        stopCountBundler++;
        if (stopCountBundler >= 25) {
          stateBundler = 2; //STOP
          speedBundler = 0;
          if (flagStopBundler == 0) {
            flagPrintBundler = 1;
            secBundler = 0;
          }
          flagStopBundler = 1;
        }
      }
      if (stateBundler == 2) {
        speedTempBundler = ctBundler;
      }

      actualBundler = ctBundler;
      if (stateBundler == 2) {
        if (BundlerBlock == 1) {
          stateBundler = 4;
        } else {
          if (BundlerWait == 1) {
            stateBundler = 3;
          }
        }
      }
      Bundler = {
        ST: stateBundler,
        CPQI: joinWord(resp.register[2], resp.register[3]), //Counter Product Quantity In
        CPQO: Math.trunc((joinWord(resp.register[2], resp.register[3])) / 3), //Counter Product Quantity Out
        SP: speedBundler
      };
      if (Bundler.CPQI < 1 || Bundler.CPQO < 1 || Bundler.CPQR < 0) {
        Bundler.CPQR = 0;
        Bundler.CPQI = 0;
        Bundler.CPQO = 0;
      }
      if (flagPrintBundler == 1) {
        if (timeBundler == temptimeBundler) {
          timeBundler = Date.now();
        }
        for (var key in Bundler) {
          fs.appendFileSync("C:/PULSE/AM_L1/L1_LOGS/mex_cue_Bundler_l1.log", "tt=" + timeBundler + ",var=" + key + ",val=" + Bundler[key] + "\n");
        }
        flagPrintBundler = 0;
        temptimeBundler = timeBundler;
      }

    });
    client.readHoldingRegisters(800, 10).then(function(resp) {
      GasFillerBitState = DataBits(resp.register[0], resp.register[1]);
      GasFillerCanBackup = GasFillerBitState[13];
      GasFillerCanInlet = GasFillerBitState[15];
    });
    client.readHoldingRegisters(900, 10).then(function(resp) {
      ctGasFiller = joinWord(resp.register[2], resp.register[3]);
      SamplesGasFiller = joinWord(resp.register[6], resp.register[7]);
      RejectGasFiller = joinWord(resp.register[4], resp.register[5]);
      RejGasFiller = SamplesGasFiller + RejectGasFiller;
      if (flagONS6 == 0) {
        speedTempGasFiller = ctGasFiller;
        flagONS6 = 1;
      }
      if (secGasFiller >= 60) {
        if (stopCountGasFiller == 0 || flagStopGasFiller == 1) {
          flagPrintGasFiller = 1;
          secGasFiller = 0;
          speedGasFiller = ctGasFiller - speedTempGasFiller;
          speedTempGasFiller = ctGasFiller;
        }
        if (flagStopGasFiller == 1) {
          timeGasFiller = Date.now();
        }
      }
      secGasFiller++;
      if (ctGasFiller > actualGasFiller) {
        stateGasFiller = 1; //RUN
        if (stopCountGasFiller >= 25) { //timestop
          speedGasFiller = (ctGasFiller - speedTempGasFiller);
          flagPrintGasFiller = 1;
          secGasFiller = 0;
        }
        timeGasFiller = Date.now();
        stopCountGasFiller = 0;
        flagStopGasFiller = 0;


      } else if (ctGasFiller == actualGasFiller && secGasFiller != 0) {
        if (stopCountGasFiller == 0) {
          timeGasFiller = Date.now();
        }
        stopCountGasFiller++;
        if (stopCountGasFiller >= 25) { //timestop
          stateGasFiller = 2; //STOP
          speedGasFiller = 0;
          if (flagStopGasFiller == 0) {
            flagPrintGasFiller = 1;
            secGasFiller = 0;
          }
          flagStopGasFiller = 1;
        }
      }
      if (stateGasFiller == 2) {
        speedTempGasFiller = ctGasFiller;
      }

      actualGasFiller = ctGasFiller;
      if (stateGasFiller == 2) {
        if (GasFillerCanBackup == 1) {
          stateGasFiller = 4;
        } else {
          if (GasFillerCanInlet == 1) {
            stateGasFiller = 3;
          }
        }
      }
      if (RejGasFiller >= 0) {
        GasFillerTempReject = RejGasFiller;
      }
      GasFiller = {
        ST: stateGasFiller,
        CPQI: joinWord(resp.register[2], resp.register[3]), //Counter Product Quantity In
        CPQO: joinWord(resp.register[2], resp.register[3]) - GasFillerTempReject, //Counter Product Quantity Out
        CPQR: GasFillerTempReject, //Counter Product Quantity Reject
        SP: speedGasFiller
      };
      if (GasFiller.CPQI < 1 || GasFiller.CPQO < 1 || GasFiller.CPQR < 0) {
        flagPrintGasFiller = 0;
      }
      if (flagPrintGasFiller == 1) {
        if (timeGasFiller == temptimeGasFiller) {
          timeGasFiller = Date.now();
        }
        for (var key in GasFiller) {
          fs.appendFileSync("C:/PULSE/AM_L1/L1_LOGS/mex_cue_GasFiller_l1.log", "tt=" + timeGasFiller + ",var=" + key + ",val=" + GasFiller[key] + "\n");
        }
        flagPrintGasFiller = 0;
        temptimeGasFiller = timeGasFiller;

      }

    });
    client.readHoldingRegisters(550, 30).then(function(resp) {
      MonoBlockBitState = DataBits(resp.register[0], resp.register[1]);
      MonoBlockVMnlet = MonoBlockBitState[13];
      MonoBlockCanInlet = MonoBlockBitState[15];
      MonoBlockCanBackup = MonoBlockBitState[12];
    });
    client.readHoldingRegisters(770, 20).then(function(resp) {
      ctMonoBlock = joinWord(resp.register[2], resp.register[3]);
      if (flagONS5 == 0) {
        speedTempMonoBlock = ctMonoBlock;
        flagONS5 = 1;
      }
      if (secMonoBlock >= 60) {
        if (stopCountMonoBlock == 0 || flagStopMonoBlock == 1) {
          flagPrintMonoBlock = 1;
          secMonoBlock = 0;
          speedMonoBlock = ctMonoBlock - speedTempMonoBlock;
          speedTempMonoBlock = ctMonoBlock;
        }
        if (flagStopMonoBlock == 1) {
          timeMonoBlock = Date.now();
        }
      }
      secMonoBlock++;
      if (ctMonoBlock > actualMonoBlock) {
        stateMonoBlock = 1; //RUN
        if (stopCountMonoBlock >= 25) { ///timestop
          speedMonoBlock = (ctMonoBlock - speedTempMonoBlock);
          flagPrintMonoBlock = 1;
          secMonoBlock = 0;
        }
        timeMonoBlock = Date.now();
        stopCountMonoBlock = 0;
        flagStopMonoBlock = 0;


      } else if (ctMonoBlock == actualMonoBlock && secMonoBlock != 0) {
        if (stopCountMonoBlock == 0) {
          timeMonoBlock = Date.now();
        }
        stopCountMonoBlock++;
        if (stopCountMonoBlock >= 25) { //tiemstop
          stateMonoBlock = 2; //STOP
          speedMonoBlock = 0;
          if (flagStopMonoBlock == 0) {
            flagPrintMonoBlock = 1;
            secMonoBlock = 0;
          }
          flagStopMonoBlock = 1;
        }
      }
      if (stateMonoBlock == 2) {
        speedTempMonoBlock = ctMonoBlock;
      }

      actualMonoBlock = ctMonoBlock;
      if (stateMonoBlock == 2) {
        if (MonoBlockCanBackup == 1) {
          stateMonoBlock = 4;
        } else {
          if (MonoBlockCanInlet == 1 || MonoBlockVMnlet == 1) {
            stateMonoBlock = 3;
          }
        }
      }
      if (speedMonoBlock < 0)
      {
        speedMonoBlock =0;
      }
      else if (speedMonoBlock > 550) {
        speedMonoBlock = 550;
      }

      MonoBlock = {
        ST: stateMonoBlock,
        CPQI: joinWord(resp.register[2], resp.register[3]), //Counter Product Quantity In
        CPQO: (joinWord(resp.register[2], resp.register[3]) - joinWord(resp.register[4], resp.register[5])), //Counter Product Quantity Out
        CPQR: 0,//joinWord(resp.register[2], resp.register[3]) - (joinWord(resp.register[2], resp.register[3]) - joinWord(resp.register[4], resp.register[5])), //Counter Product Quantity Reject
        SP: speedMonoBlock,
      };
      if((joinWord(resp.register[2], resp.register[3])-(joinWord(resp.register[2], resp.register[3]) - joinWord(resp.register[4], resp.register[5])))>0){
      		MonoBlock.CPQR = (joinWord(resp.register[2], resp.register[3])-(joinWord(resp.register[2], resp.register[3]) - joinWord(resp.register[4], resp.register[5])));
      }
      if (MonoBlock.CPQI < 1 || MonoBlock.CPQO < 1 || MonoBlock.CPQR < 0) {
        flagPrintMonoBlock = 0;
      }
      if (flagPrintMonoBlock == 1) {
        if (timeMonoBlock == temptimeMonoBlock) {
          timeMonoBlock = Date.now();
        }
        for (var key in MonoBlock) {
          fs.appendFileSync("C:/PULSE/AM_L1/L1_LOGS/mex_cue_MonoBlock_l1.log", "tt=" + timeMonoBlock + ",var=" + key + ",val=" + MonoBlock[key] + "\n");
        }
        flagPrintMonoBlock = 0;
        temptimeMonoBlock = timeMonoBlock;
      }

    });

    client.readHoldingRegisters(80, 40).then(function(resp) {
      CaseErectorBitState = DataBits(resp.register[0], resp.register[1]);
      CaseErectorBlock = CaseErectorBitState[4];
      ctCaseErector = joinWord(resp.register[4], resp.register[5]);
    });

    client.readHoldingRegisters(41, 40).then(function(resp) {
      CasePackerBitState = DataBits(resp.register[7], resp.register[8]);
      CasePackerBlock = CasePackerBitState[7];
      CasePackerWait1 = CasePackerBitState[5];
      CasePackerWait2 = CasePackerBitState[3];
      CasePackerWait3 = CasePackerBitState[1];
      CasePackerOut = joinWord(resp.register[3], resp.register[4]);

      //ctCasePacker = CaseErector.CPQO;
      ctCasePacker = joinWord(resp.register[3], resp.register[4]);
      if (flagONS1 == 0) {
        speedTempCasePacker = ctCasePacker;
        flagONS1 = 1;
      }
      if (secCasePacker >= 60) {
        if (stopCountCasePacker == 0 || flagStopCasePacker == 1) {
          flagPrintCasePacker = 1;

          secCasePacker = 0;
          speedCasePacker = ctCasePacker - speedTempCasePacker;
          speedTempCasePacker = ctCasePacker;
        }
        if (flagStopCasePacker == 1) {
          timeCasePacker = Date.now();
        }
      }
      secCasePacker++;
      if (ctCasePacker > actualCasePacker) {
        stateCasePacker = 1; //RUN
        if (stopCountCasePacker >= 50) { //timestop
          speedCasePacker = (ctCasePacker - speedTempCasePacker);
          flagPrintCasePacker = 1;
          secCasePacker = 0;
        }
        timeCasePacker = Date.now();
        stopCountCasePacker = 0;
        flagStopCasePacker = 0;


      } else if (ctCasePacker == actualCasePacker && secCasePacker != 0) {
        if (stopCountCasePacker == 0) {
          timeCasePacker = Date.now();
        }
        stopCountCasePacker++;
        if (stopCountCasePacker >= 50) {
          stateCasePacker = 2; //STOP
          speedCasePacker = 0;
          if (flagStopCasePacker == 0) {
            flagPrintCasePacker = 1;
            secCasePacker = 0;
          }
          flagStopCasePacker = 1;
        }
      }
      if (stateCasePacker == 2) {
        speedTempCasePacker = ctCasePacker;
      }

      actualCasePacker = ctCasePacker;
      if (stateCasePacker == 2) {
        if (CasePackerBlock == 0) {
          stateCasePacker = 4;
        } else {
          if (CasePackerWait1 == 1 || CasePackerWait2 == 1 || CasePackerWait3 == 1) {
            stateCasePacker = 3;
          }
        }
      }

      CasePacker = {
        ST: stateCasePacker,
        CPQO: joinWord(resp.register[3], resp.register[4]), //Counter Product Quantity Out
        SP: speedCasePacker,
      };

      if (CasePacker.CPQO < 0) {
        flagPrintCasePacker = 0;
      }
      if (flagPrintCasePacker == 1) {
        if (timeCasePacker == temptimeCasePacker) {
          timeCasePacker = Date.now();
        }
        for (var key in CasePacker) {
          fs.appendFileSync("C:/PULSE/AM_L1/L1_LOGS/mex_cue_CasePacker_l1.log", "tt=" + timeCasePacker + ",var=" + key + ",val=" + CasePacker[key] + "\n");
        }
        flagPrintCasePacker = 0;
        temptimeCasePacker = timeCasePacker;
      }

      // // NOTE: CaseErector Code!
      if (flagONS2 == 0) {
        speedTempCaseErector = ctCaseErector;
        flagONS2 = 1;
      }
      if (secCaseErector >= 60) {
        if (stopCountCaseErector == 0 || flagStopCaseErector == 1) {
          flagPrintCaseErector = 1;
          secCaseErector = 0;
          speedCaseErector = ctCaseErector - speedTempCaseErector;
          speedTempCaseErector = ctCaseErector;
        }
        if (flagStopCaseErector == 1) {
          timeCaseErector = Date.now();
        }
      }
      secCaseErector++;
      if (ctCaseErector > actualCaseErector) {
        stateCaseErector = 1; //RUN
        if (stopCountCaseErector >= 60) { //timestop
          speedCaseErector = (ctCaseErector - speedTempCaseErector);
          flagPrintCaseErector = 1;
          secCaseErector = 0;
        }
        timeCaseErector = Date.now();
        stopCountCaseErector = 0;
        flagStopCaseErector = 0;


      } else if (ctCaseErector == actualCaseErector && secCaseErector != 0) {
        if (stopCountCaseErector == 0) {
          timeCaseErector = Date.now();
        }
        stopCountCaseErector++;
        if (stopCountCaseErector >= 60) { //timestop
          stateCaseErector = 2; //STOP
          speedCaseErector = 0;
          if (flagStopCaseErector == 0) {
            flagPrintCaseErector = 1;
            secCaseErector = 0;
          }
          flagStopCaseErector = 1;
        }
      }
      if (stateCaseErector == 2) {
        speedTempCaseErector = ctCaseErector;
      }

      actualCaseErector = ctCaseErector;
      if (stateCaseErector == 2) {
        if (CaseErectorBlock == 1) {
          stateCaseErector = 4;
        }
      }
      CaseErector = {
        ST: stateCaseErector,
        CPQO: joinWord(resp.register[3], resp.register[4]),//joinWord(resp.register[4], resp.register[5]), //Counter Product Quantity Out
        SP: speedCaseErector,
      };
      if (CaseErector.CPQO < 1) {
        flagPrintCaseErector = 0;
      }
      if (flagPrintCaseErector == 1) {
        for (var key in CaseErector) {
          if (timeCaseErector == temptimeCaseErector) {
            timeCaseErector = Date.now();
          }
          fs.appendFileSync("C:/PULSE/AM_L1/L1_LOGS/mex_cue_CaseErector_l1.log", "tt=" + timeCaseErector + ",var=" + key + ",val=" + CaseErector[key] + "\n");
        }
        flagPrintCaseErector = 0;
        temptimeCaseErector = timeCaseErector;
      }
    });

    client.readHoldingRegisters(120, 40).then(function(resp) {
      CaseSealerBitState = DataBits(resp.register[0], resp.register[1]);
      var waitCaseSealer = CaseSealerBitState[5];
      var blockCaseSealer = CaseSealerBitState[6];
      ctCaseSealer = joinWord(resp.register[4], resp.register[5]);
      if (flagONS3 == 0) {
        speedTempCaseSealer = ctCaseSealer;
        flagONS3 = 1;
      }
      if (secCaseSealer >= 60) {
        if (stopCountCaseSealer == 0 || flagStopCaseSealer == 1) {
          flagPrintCaseSealer = 1;
          secCaseSealer = 0;
          speedCaseSealer = ctCaseSealer - speedTempCaseSealer;
          speedTempCaseSealer = ctCaseSealer;
        }
        if (flagStopCaseSealer == 1) {
          timeCaseSealer = Date.now();
        }
      }
      secCaseSealer++;
      if (ctCaseSealer > actualCaseSealer) {
        stateCaseSealer = 1; //RUN
        if (stopCountCaseSealer >= 60) {
          speedCaseSealer = (ctCaseSealer - speedTempCaseSealer);
          flagPrintCaseSealer = 1;
          secCaseSealer = 0;
        }
        timeCaseSealer = Date.now();
        stopCountCaseSealer = 0;
        flagStopCaseSealer = 0;
      } else if (ctCaseSealer == actualCaseSealer && secCaseSealer != 0) {
        if (stopCountCaseSealer == 0) {
          timeCaseSealer = Date.now();
        }
        stopCountCaseSealer++;
        if (stopCountCaseSealer >= 60) {
          stateCaseSealer = 2; //STOP
          speedCaseSealer = 0;
          if (flagStopCaseSealer == 0) {
            flagPrintCaseSealer = 1;
            secCaseSealer = 0;
          }
          flagStopCaseSealer = 1;
        }
      }
      if (stateCaseSealer == 2) {
        speedTempCaseSealer = ctCaseSealer;
      }

      actualCaseSealer = ctCaseSealer;
      if (stateCaseSealer == 2) {
        if (CaseSealerBlock == 1) {
          stateCaseSealer = 4;
        } else {
          if (waitCaseSealer == 1) {
            stateCaseSealer = 3;
          }
        }
      }
      CaseSealer = {
        ST: stateCaseSealer,
        CPQO: joinWord(resp.register[4], resp.register[5]), //Counter Product Quantity Out
        SP: speedCaseSealer
      };
      if (CaseSealer.CPQO < 1) {
        flagPrintCaseSealer = 0;
      }
      if (flagPrintCaseSealer == 1) {
        if (timeCaseSealer == temptimeCaseSealer) {
          timeCaseSealer = Date.now();
        }
        for (var key in CaseSealer) {
          fs.appendFileSync("C:/PULSE/AM_L1/L1_LOGS/mex_cue_CaseSealer_l1.log", "tt=" + timeCaseSealer + ",var=" + key + ",val=" + CaseSealer[key] + "\n");
        }
        if (CntEOL != 0) {
          fs.appendFileSync("C:/PULSE/AM_L1/L1_LOGS/mex_cue_EOL_l1.log", "tt=" + timeCaseSealer + ",var=EOL" + ",val=" + CntEOL + "\n");

        }

        flagPrintCaseSealer = 0;
        temptimeCaseSealer = timeCaseSealer;
      }

    });

  };

  var joinWord=function(num1, num2) {
    var bits = "00000000000000000000000000000000";
    var bin1 = num1.toString(2),
      bin2 = num2.toString(2),
      newNum = bits.split("");
    for (var i = 0; i < bin1.length; i++) {
      newNum[31 - i] = bin1[(bin1.length - 1) - i];
    }
    for (var j = 0; j < bin2.length; j++) {
      newNum[15 - j] = bin2[(bin2.length - 1) - j];
    }
    bits = newNum.join("");
    return parseInt(bits, 2);
  };

  var DataBits=function(num1, num2) {
    var bits = "00000000000000000000000000000000";
    var bin1 = num1.toString(2),
      bin2 = num2.toString(2),
      newNum = bits.split("");
    for (var i = 0; i < bin1.length; i++) {
      newNum[31 - i] = bin1[(bin1.length - 1) - i];
    }
    for (var i = 0; i < bin2.length; i++) {
      newNum[15 - i] = bin2[(bin2.length - 1) - i];
    }
    bits = newNum.join("");
    return bits;
  };

  var stop = function() {
    ///This function clean data
    clearInterval(intId);
  };

  var shutdown = function() {
    ///Use function STOP and close connection
    stop();
    client.close();
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

        var idle = function(){
          i=0;
          text2send=[];
          for (var k=0;k<files.length;k++){//Verificar los archivos
            var stats = fs.statSync("C:/PULSE/AM_L1/L1_LOGS//"+files[k]);
            var mtime = new Date(stats.mtime).getTime();
            if (mtime< (Date.now() - (8*60*1000))&&files[k].indexOf("serialbox")==-1){
              flagInfo2Send=1;
              text2send[i]=files[k];
              i++;
            }
          }
        };

  clientW2.on('error', function(err) {
    fs.appendFileSync("errorW2.log", err + '\n');
    clearInterval(intIdW2);
  });
  clientW2.on('close', function() {
    clearInterval(intIdW2);
  });
  clientW3.on('error', function(err) {
    fs.appendFileSync("errorW3.log", err + '\n');
    clearInterval(intIdW3);
  });
  clientW3.on('close', function() {
    clearInterval(intIdW3);
  });
  ///*If client is in a error ejecute an acction*/
  client.on('error', function(err) {
    fs.appendFileSync("error.log", err + '\n');
    ////////////console.log('Client Error', err);
  });
  ///If client try closed, this metodo try reconnect client to server
  client.on('close', function() {
    fs.appendFileSync("error.log", 'Client closed, stopping interval.');
    stop();
  });

} catch (err) {
  fs.appendFileSync("error.log", err + '\n');
}
