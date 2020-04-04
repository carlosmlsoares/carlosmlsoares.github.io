var CustomNode = {
    template: `<div class="node" :class="[selected(), node.name] | kebab">
    <div class="title" style=text-align:center>ola{{node.name}}</div> 
    <div class="title" style=text-align:center>asdasds</div> 
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