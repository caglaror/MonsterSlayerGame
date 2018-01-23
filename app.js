
window.addEventListener('load',function(){
    "use strict";

    new Vue({
        el:'#app',
        data:{
            buttonMenu:true,
            logs:[], // {actionSource:'', actionTarget:'', actionType:'', actionPoints:}
            player:{
                health:100,
                name:"PLAYER"
            },
            monster:{
                health:100,
                name:"MONSTER"
            }
        },
        methods:{
            restart: function(){
              this.player.health=100;
              this.monster.health=100;
              this.buttonMenu = !this.buttonMenu;
              this.logs = [];
            },
            giveup: function () {
                this.restart();
                this.buttonMenu = !this.buttonMenu;
                this.logs = [];
            },
            hit:function(source,target,multiplyHitBy=1){
                var vm = this;
                if(target.health<=0){
                    alert(target.name +' HAS ALREADY FALLEN!');
                    this.restart();
                    return false;
                }
                var rand = Math.floor(Math.random()*10*multiplyHitBy);
                target.health-=rand;
                if(target.health<=0){
                    target.health=0;
                    alert(target.name +' LOST THE GAME! \n'+ source.name + ' WINS!');
                    this.restart();
                    return false;
                }else{
                    vm.logs.unshift({actionSource:source, actionTarget:target, actionType:'HITS', actionPoints:rand});
                }

            },
            hitTrigger:function(){
                this.hit(this.player,this.monster,1);
                    this.hit(this.monster,this.player,1);

            },
            specialHitTrigger:function(){
                this.hit(this.player,this.monster,2);
                    this.hit(this.monster,this.player,1);

            },
            heal:function(target){
                var vm = this;
                if(target.health<1){
                                    alert(target.name +' HAS ALREADY FALLEN!');
                                    this.restart();
                                    return false;
                }
                var rand = Math.floor(Math.random()*10);
                target.health+=rand;
                if(target.health>=100){target.health=100}
                vm.logs.unshift({actionSource:target, actionTarget:target, actionType:'HEALS', actionPoints:rand});
                this.hit(this.monster,this.player,1);
            }
        },
        computed:{
            playersHealth :function() {
                return (this.player.health*3)+'px';
            },
            monstersHealth: function(){
                return (this.monster.health*3)+'px';
            }

        },
        watch:{

        }
    });


})