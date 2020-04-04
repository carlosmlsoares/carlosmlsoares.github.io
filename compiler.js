

compile = function(){

  

  var json = editor.toJSON();
  console.log(json)
  var nodes=[];
  for (node in json.nodes){
    nodes.push(json.nodes[node])
  }
  
  var triggerNodes=[]
  var actionNodes=[]
  var conditionNodes=[]
  for(node in nodes){
    var node = nodes[node]
    
    var inputs= node['inputs']
    var outputs=node['outputs']
    var trigger=false;
    var condition=false;
    var action=false;
    
    //Verify type of node, if it's trigger, Conditioner or Actioner
    for (var input in inputs){
      var numberConns = inputs[input]['connections'].length
      
      if(numberConns >0){action=true}
    }
    for (var output in outputs){
      var numberConns = outputs[output]['connections'].length
      if(numberConns >0){trigger=true}
    }
    if (trigger==true && action==true){
      condition=true;
      conditionNodes.push(node);
    }
    if (trigger==true && action==false){
      triggerNodes.push(node);
    }
    if (trigger==false && action==true){
      actionNodes.push(node);
    }
  }
  if (triggerNodes.length>0){
    console.log("Trigger: "+ triggerNodes[0]['name'] + "  -  "+triggerNodes[0]['data']['data'])
  }
  if (conditionNodes.length>0){
    console.log("Condition: "+ conditionNodes[0]['name'] + "  -  "+conditionNodes[0]['data']['data'])
  }
  if (actionNodes.length>0){
    console.log("Actioner: "+ actionNodes[0]['name'] + "  -  "+actionNodes[0]['data']['data'])
  }
  var d = new Date()
  var filename="automations_"+d.getDate()+d.getMonth()+1+d.getHours()+d.getMinutes()+".txt";
  generateFile(filename,triggerNodes,conditionNodes,actionNodes);

}

function generateFile(filename, triggers,conditions,actions) {


  
  var element = document.createElement('a');
  var text="alias:\n";
  text+="trigger:\n";

  triggers.forEach(element => {
    text+="    platform: state\n";
    text+="    entity_id: "+getDevice(element["name"])+"\n";
    text+="    to: \""+element["data"]["data"]+"\"\n";
  });
  text+="action:\n";
  actions.forEach(element => {
    text+="    service: "+ getDevice(element["name"])+"."+element["data"]["data"]+"\n";
  });

  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function getDevice(name){
  var ents={"sun.sun":{"entity_id":"sun.sun","state":"below_horizon","attributes":{"next_dawn":"2020-01-30T07:18:14+00:00","next_dusk":"2020-01-30T18:17:15+00:00","next_midnight":"2020-01-30T00:47:50+00:00","next_noon":"2020-01-30T12:47:45+00:00","next_rising":"2020-01-30T07:47:25+00:00","next_setting":"2020-01-30T17:48:04+00:00","elevation":-57.47,"azimuth":307.45,"rising":false,"friendly_name":"Sun"},"last_changed":"2020-01-29T18:06:15.997257+00:00","last_updated":"2020-01-29T23:01:30.008507+00:00","context":{"id":"07da46f072ee4c6e8490d2dbb2f308ad","parent_id":null,"user_id":null}},"binary_sensor.updater":{"entity_id":"binary_sensor.updater","state":"unavailable","attributes":{"friendly_name":"Updater"},"last_changed":"2020-01-29T18:06:25.646339+00:00","last_updated":"2020-01-29T18:06:25.646339+00:00","context":{"id":"d9fa8316f177484984263f396ecaf1bf","parent_id":null,"user_id":null}},"switch.sonoff_100034605a":{"entity_id":"switch.sonoff_100034605a","state":"off","attributes":{"device_id":"100034605a","rssi":-71,"friendly_name":"Sonoff Quarto"},"last_changed":"2020-01-29T18:08:13.955854+00:00","last_updated":"2020-01-29T20:47:06.011025+00:00","context":{"id":"055fc20df5d942ddb00a25a16424c70f","parent_id":null,"user_id":null}},"person.carlos_soares":{"entity_id":"person.carlos_soares","state":"unknown","attributes":{"editable":true,"id":"22ec52637ecd49cc8b038d127c13abfe","user_id":"5ced196571504c34bfd6c6d45325b442","friendly_name":"Carlos Soares"},"last_changed":"2020-01-29T18:06:26.912258+00:00","last_updated":"2020-01-29T18:06:31.341884+00:00","context":{"id":"9897b80f65ec4c0bac488b0823ff0c6d","parent_id":null,"user_id":null}},"automation.home_assistant_down":{"entity_id":"automation.home_assistant_down","state":"on","attributes":{"last_triggered":null,"id":"1574289055472","friendly_name":"Home Assistant Down"},"last_changed":"2020-01-29T18:06:26.954470+00:00","last_updated":"2020-01-29T18:06:26.954470+00:00","context":{"id":"4491f01416e44533bec62769a3e6bdd4","parent_id":null,"user_id":null}},"automation.notificar_que_a_luz_esta_acesa":{"entity_id":"automation.notificar_que_a_luz_esta_acesa","state":"on","attributes":{"last_triggered":"2020-01-29T18:08:13.822188+00:00","id":"1574764616272","friendly_name":"Notificar que a luz está acesa"},"last_changed":"2020-01-29T18:06:26.955607+00:00","last_updated":"2020-01-29T18:08:13.822846+00:00","context":{"id":"32fc601b54614098afebc4d699c545d1","parent_id":"7aac7653a58e40d18dd137323e3cec5f","user_id":null}},"automation.home_assistant_up":{"entity_id":"automation.home_assistant_up","state":"on","attributes":{"last_triggered":"2020-01-29T18:06:32.693319+00:00","id":"1574289902334","friendly_name":"Home Assistant Up"},"last_changed":"2020-01-29T18:06:26.956539+00:00","last_updated":"2020-01-29T18:06:32.694421+00:00","context":{"id":"631adbb93167439dbecb90e9f98e0f2f","parent_id":null,"user_id":null}},"automation.ligar_a_luz_ao_anoitecer":{"entity_id":"automation.ligar_a_luz_ao_anoitecer","state":"on","attributes":{"last_triggered":null,"id":"1575412366062","friendly_name":"Ligar a Luz ao Anoitecer"},"last_changed":"2020-01-29T18:06:26.957346+00:00","last_updated":"2020-01-29T18:06:26.957346+00:00","context":{"id":"b5e4abd800204e3b9cc97f1a14a6589b","parent_id":null,"user_id":null}},"group.all_switches":{"entity_id":"group.all_switches","state":"off","attributes":{"entity_id":["switch.sonoff_100034605a"],"order":0,"auto":true,"friendly_name":"all switches","hidden":true},"last_changed":"2020-01-29T18:08:13.957956+00:00","last_updated":"2020-01-29T18:08:13.957956+00:00","context":{"id":"e636ef09d3d3450fb21870db46689e9d","parent_id":null,"user_id":null}},"group.all_automations":{"entity_id":"group.all_automations","state":"on","attributes":{"entity_id":["automation.home_assistant_down","automation.home_assistant_up","automation.ligar_a_luz_ao_anoitecer","automation.notificar_que_a_luz_esta_acesa"],"order":1,"auto":true,"friendly_name":"all automations","hidden":true},"last_changed":"2020-01-29T18:06:27.301609+00:00","last_updated":"2020-01-29T18:06:27.301609+00:00","context":{"id":"3178142ff81f44ad8e81f4601584e851","parent_id":null,"user_id":null}},"media_player.chromecast":{"entity_id":"media_player.chromecast","state":"off","attributes":{"friendly_name":"ChromeCast","supported_features":21389},"last_changed":"2020-01-29T19:07:00.562736+00:00","last_updated":"2020-01-29T19:07:00.562736+00:00","context":{"id":"7812a9332a034518bcd621a232731d86","parent_id":null,"user_id":null}},"zone.home":{"entity_id":"zone.home","state":"zoning","attributes":{"hidden":true,"latitude":40.74101426921151,"longitude":-8.657226562500002,"radius":100,"friendly_name":"Início","icon":"mdi:home"},"last_changed":"2020-01-29T18:06:27.357568+00:00","last_updated":"2020-01-29T18:06:27.357568+00:00","context":{"id":"981fcaa20876457ca0885c7d8875a364","parent_id":null,"user_id":null}},"media_player.quarto":{"entity_id":"media_player.quarto","state":"off","attributes":{"friendly_name":"Quarto","supported_features":21389},"last_changed":"2020-01-29T19:06:53.694975+00:00","last_updated":"2020-01-29T19:06:53.694975+00:00","context":{"id":"820c2e740f8d456b96a4a53454a3e321","parent_id":null,"user_id":null}},"group.all_devices":{"entity_id":"group.all_devices","state":"unknown","attributes":{"entity_id":[],"order":2,"auto":true,"friendly_name":"all devices","hidden":true},"last_changed":"2020-01-29T18:06:27.511660+00:00","last_updated":"2020-01-29T18:06:27.511660+00:00","context":{"id":"92d561d3129f4f588c4993e62f19a158","parent_id":null,"user_id":null}},"device_tracker.carlos_soares_s_mi_9t":{"entity_id":"device_tracker.carlos_soares_s_mi_9t","state":"unknown","attributes":{"source_type":"gps","friendly_name":"Carlos Soares's Mi 9T"},"last_changed":"2020-01-29T18:06:27.526229+00:00","last_updated":"2020-01-29T18:06:27.526229+00:00","context":{"id":"ffbb24a57bec42edbed2c3a2b09f3615","parent_id":null,"user_id":null}},"weather.inicio":{"entity_id":"weather.inicio","state":"partlycloudy","attributes":{"temperature":12.7,"humidity":89,"pressure":1023.2,"wind_bearing":172.3,"wind_speed":20.2,"attribution":"Weather forecast from met.no, delivered by the Norwegian Meteorological Institute.","forecast":[{"datetime":"2020-01-30T12:00:00+00:00","temperature":13.9,"condition":"rainy","pressure":1022.3,"humidity":91.2,"wind_speed":24.8,"wind_bearing":176.6},{"datetime":"2020-01-31T12:00:00+00:00","temperature":16.1,"condition":"rainy","pressure":1022.9,"humidity":91.9,"wind_speed":18.7,"wind_bearing":196.9},{"datetime":"2020-02-01T12:00:00+00:00","temperature":16.3,"condition":"rainy","pressure":1025.4,"humidity":91.7,"wind_speed":15.8,"wind_bearing":217},{"datetime":"2020-02-02T12:00:00+00:00","temperature":17.7,"condition":"partlycloudy","pressure":1027.9,"humidity":79.2,"wind_speed":16.6,"wind_bearing":170.5},{"datetime":"2020-02-03T12:00:00+00:00","temperature":20.2,"condition":"sunny","pressure":1025,"humidity":65.4,"wind_speed":14.4,"wind_bearing":168.8}],"friendly_name":"Início"},"last_changed":"2020-01-29T23:00:33.299187+00:00","last_updated":"2020-01-29T23:00:33.299187+00:00","context":{"id":"40a49d4845394df2a0da01592cfc9b92","parent_id":null,"user_id":null}},"persistent_notification.notification":{"entity_id":"persistent_notification.notification","state":"notifying","attributes":{"message":"Light on"},"last_changed":"2020-01-29T18:06:36.048029+00:00","last_updated":"2020-01-29T18:06:36.048029+00:00","context":{"id":"18fc028348e143b980bb01d80df05688","parent_id":null,"user_id":null}},"persistent_notification.notification_2":{"entity_id":"persistent_notification.notification_2","state":"notifying","attributes":{"message":"Light on"},"last_changed":"2020-01-29T18:08:13.810090+00:00","last_updated":"2020-01-29T18:08:13.810090+00:00","context":{"id":"db25dd3659d845e98a9959134e05278d","parent_id":null,"user_id":null}},"persistent_notification.http_login":{"entity_id":"persistent_notification.http_login","state":"notifying","attributes":{"title":"Login attempt failed","message":"Login attempt or request with invalid authentication from 192.168.1.69"},"last_changed":"2020-01-29T21:52:26.506334+00:00","last_updated":"2020-01-29T21:52:26.506334+00:00","context":{"id":"891db4954e9a484e9054f3003479e07e","parent_id":null,"user_id":null}}}

  for (var entity in ents){
    var friendly_name = ents[entity]["attributes"]["friendly_name"]
    if (friendly_name==name){
      console.log(ents[entity]["entity_id"])
      return ents[entity]["entity_id"]
    }
  }
}