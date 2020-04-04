var numSocket = new Rete.Socket('String');
var container = document.querySelector('#rete');


var editor = new Rete.NodeEditor('demo@0.1.0', container);

var VueDropControl = {
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData','idName','lista'],
  template: '<select id="${idName}" al-value="selectedId" @change= "change($event)" ><option></option><option v-for="item in lista">{{item}}</option></select>',
  data() {
    return {
      value: "",
    }
  },
  methods: {
    change(e){
      //console.log(e.target.value);
      this.value = e.target.value;
      this.update();
    },
    update() {
      if (this.ikey)
        this.putData(this.ikey, this.value)
      this.emitter.trigger('process');
    }
  },
  mounted() {
    this.value = this.getData(this.ikey);
  }
}


var VueNumControl = {
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
  template: '<input type="text" :readonly="readonly" :value="value" @input="change($event)" @dblclick.stop=""/>',
  data() {
    return {
      value: 0,
    }
  },
  methods: {
    change(e){
      this.value = e.target.value;
      this.update();
      this.emitter.trigger('process');
    },
    update() {
      if (this.ikey)
        this.putData(this.ikey, this.value)
      this.emitter.trigger('process');
      this.update();
    }
  },
  mounted() {
    this.value = this.getData(this.ikey);
  }
}

class DropControl extends Rete.Control {

  constructor(emitter, key, readonly,idName,lista) {
    
    super(key);
    this.component = VueDropControl;
    this.lista=lista;
    
    this.props = { emitter, ikey: key, readonly,idName,lista};
    
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}

class NumControl extends Rete.Control {

  constructor(emitter, key, readonly) {
    super(key);
    this.component = VueNumControl;
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}

var CustomNode = {
  template: `<div class="node" :class="[selected(), node.name] | kebab">
  <div class="title" style=text-align:center>{{node.name}}</div> 
  <!-- Controls-->
  <div class="control" v-for="control in controls()" v-control="control"></div>
  <!-- Outputs-->
  <div class="output" v-for="output in outputs()" :key="output.key">
    <div class="output-title">{{output.name}}</div>
    <Socket v-socket:output="output" type="output" :socket="output.socket"></Socket>
  </div>
  <!-- Inputs-->
  <div class="input" v-for="input in inputs()" :key="input.key">
    <Socket v-socket:input="input" type="input" :socket="input.socket"></Socket>
    <div class="input-title" v-show="!input.showControl()">{{input.name}}</div>
    <div class="input-control" v-show="input.showControl()" v-control="input.control"></div>
  </div>
</div>`,
  mixins: [VueRenderPlugin.mixin],
  components: {
    Socket: VueRenderPlugin.Socket
  }
}

class NumComponent extends Rete.Component {

    constructor(name){
        super(name);
        this.data.component = CustomNode;
    }

    builder(node) {
        var out1 = new Rete.Output('num', "", numSocket);
        //var lista =[1,2,3,45,123];
        var lista =["ola","adeus"];
        return node.addControl(new DropControl(this.editor, 'num',false, "drop",lista)).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.data.num;
        
    }
}

class AddComponent extends Rete.Component {
    constructor(name){
        super(name);
        this.data.component = CustomNode;
    }

    builder(node) {
        var inp1 = new Rete.Input('num1',"", numSocket);
        
        return node
            .addInput(inp1)
            
            .addControl(new NumControl(this.editor, 'preview', true))
            
    }

    worker(node, inputs, outputs) {
        
        var n1 = inputs['num1'].length?inputs['num1'][0]:node.data.num1;
        this.editor.nodes.find(n => n.id == node.id).controls.get('preview').setValue(n1);
    }
}

(async () => {
    devices=["Bedroom Light","Kitchen Switch","Bedroom Chromecast","asdsa","213","asdas","zxczx","asfdgfdd","jhg","asd"]
    var components=[] 
    devices.forEach(element => {
      components.push(new NumComponent(element));
    });
    
    
    editor.use(ConnectionPlugin);
    editor.use(VueRenderPlugin);
    editor.use(ContextMenuPlugin,{
        searchBar: true,
        delay: 100,
    });
    editor.use(AreaPlugin);
    editor.use(DockPlugin.default, {
      container: document.querySelector('.dock'),
      itemClass: 'dock-item', // default: dock-item 
      plugins: [VueRenderPlugin] // render plugins
    });
    var engine = new Rete.Engine('demo@0.1.0');
    
    components.map(c => {
        editor.register(c);
        engine.register(c);
    });

    var n1 = await components[0].createNode();
    var add = await components[1].createNode();

    n1.position = [80, 200];
    add.position = [500, 240];
 

    editor.addNode(n1);
    editor.addNode(add);



    editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
      
        await engine.abort();
        await engine.process(editor.toJSON());
        
    });

    editor.view.resize();
    AreaPlugin.zoomAt(editor);
    editor.trigger('process');
    
})();



