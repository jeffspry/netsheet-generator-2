

Vue.component('property-info', {
    template: '#property-info',
    data: function() { return {
        salesPrice: '',
        propertyAddress: '',
        strippedPrice: ''
    }
    },
    computed:{
      strippedPrice: function(){
        if (this.salesPrice < 1000 && this.salesPrice > 50){
          return this.salesPrice * 1000;
        } else if (this.salesPrice >= 1 && this.salesPrice <= 50) {
          return this.salesPrice * 1000000;        
        } else {
          return parseInt(this.salesPrice);
        }
      },
  	consolidated: function() {
    	return {
      	salesPrice: this.salesPrice,
        propertyAddress: this.propertyAddress,
        strippedPrice: this.strippedPrice
      }
    }
    },
    watch: {
      consolidated: function(){
        this.$emit('changed', this.consolidated);
      }
    }
})

Vue.component('agent-info',{
    template: '#agent-info',
    data: function() { return {
        agencyName: '',
        agentName: '',
        agentPhone: '',
        agentEmail: '',
        listingCommission: '2.5',
        sellingCommission: '2.5'
    }
    },
})

Vue.component('escrow-info',{
    template: '#escrow-info',
    data: function() { return {
        officerEmail: '',
        officerName: '',
        officerPhone: ''
    }
    }
})

Vue.component('fees',{
    template: '#fees',
    data: function() { return {
        salesPrice: '',
        propertyAddress: '',
        strippedPrice: '',
        categories:
        [
            {fullName:'Escrow Fees', sectionName:'escrow-fees'},
            {fullName:'Title Fees', sectionName:'title-fees'},
            {fullName:'Payoff Fees', sectionName:'payoff-fees'},
            {fullName:'HOA Fees', sectionName:'hoa-fees'},
            {fullName:'Misc Fees', sectionName:'misc-fees'}
        ]

    }
    }
})


new Vue({
    el: '#app',
    data: {
        allViews:
        [   
            { fullName:'Property Info', sectionName:'property-info', id: 0 },
            { fullName:'Agent Info', sectionName:'agent-info', id: 1 },
            { fullName:'Escrow Info', sectionName:'escrow-info', id: 2 },
            { fullName:'Fees', sectionName:'fees', id: 3 },
            { fullName:'Sheet Preview', sectionName:'sheet-preview', id: 4 }
        ],
        currentView: 'property-info',
        currentIndex: 0,
        inputData: {}
    },
    methods:{
        nextView: function(){
            this.currentIndex += 1
            this.currentView = this.allViews[this.currentIndex].sectionName
        },
        previousView: function(){
            this.currentIndex -= 1
            this.currentView = this.allViews[this.currentIndex].sectionName
        },
        showView: function(section, id){
            console.log("Show section: " + section,"Section ID: " + id)
            this.currentView = section
            this.currentIndex = id
        },
        onChanged: function(data){
          this.inputData = data
          console.log(this.inputData)
        }
    },
    computed:{
        prevAllowed: function(){
            if (this.currentIndex > 0){
                return true
            }else { return false }
        },
        nextAllowed: function(){
            if (this.currentIndex < this.allViews.length-1){
                return true
            }else { return false }
        }
    },
    watch:{
        currentIndex: function(val, oldval){
          // console.log("Watch of currentIndex:",val,oldval)
          var newActive = document.getElementById(val)
          var oldActive = document.getElementById(oldval)
          newActive.className += 'activeSection'
          oldActive.classList.remove('activeSection')
        }
    },
    mounted: function(){
        var active = document.getElementById('0')
        active.className += 'activeSection'
    },
})



