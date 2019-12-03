<template>
    <div>
        <nav-header></nav-header>
        <nav-bread><span>Goods</span></nav-bread>
        <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" @click="sortGoods" class="price">Price 
              <svg class="icon icon-arrow-short" v-bind:class="{'sort-up':!sortFlag}">
                <use xlink:href="#icon-arrow-short"></use>
              </svg>
            </a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showPriceBar">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show': showTopBar}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd>
                  <a href="javascript:void(0)" v-bind:class="{'cur':priceSelected =='ALL'}" @click="selectedOne('ALL')">All</a>
                </dd>
                <dd v-for="(price, index) in priceFilter" :key="index">
                  <a href="javascript:void(0)" v-bind:class="{'cur':priceSelected==index}" @click="selectedOne(index)">{{price.startPrice}}-{{price.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item, index) in goodsList" :key="index">
                    <div class="pic">
                      <a href="#"><img v-lazy="'/static/' + item.productImage"/></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice | currency('$')}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" @click="addCart(item.productId)" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="view-more-normal" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
                    <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-if="mdShow" @click="closeTop"></div>
      <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
        <p slot="message">请先登录！</p>
        <div slot="btnGroup"><a class="btn btn--m" @click="mdShow=false" href="javascript:;">关闭</a></div>
      </modal>
       <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
        <p slot="message">加入购物车成功！</p>
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
          </svg>
        <div slot="btnGroup">
          <a class="btn btn--m" @click="mdShowCart=false" href="javascript:;">继续购物</a>
          <router-link class="btn btn--m" to="/cart">查看购物车</router-link>
        </div>
      </modal>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
import './../assets/css/base.css'
import './../assets/css/product.css'
import NavHeader from '@/components/NavHeader.vue'
import NavFooter from '@/components/NavFooter.vue'
import NavBread from '@/components/NavBread.vue'
import modal from '@/components/Modal.vue'
import axios from 'axios'
export default {
  data(){
    return {
      goodsList:[],
      priceFilter:[
        {
          startPrice: 0.00,
          endPrice: 100.00
        },{
          startPrice: 100.00,
          endPrice: 500.00
        },{
          startPrice: 500.00,
          endPrice: 1000.00
        },{  
          startPrice: 1000.00,
          endPrice: 5000.00}
      ],
      priceSelected: 'ALL',
      showTopBar: false,
      showMask: false,
      sortFlag: true,
      page:1,             //当前页
      pageSize:8,         //展示条数
      sort:1,              //升序
      busy:true,
      loading: false,
      mdShow: false,       //没有登录提示模态框是否展示
      mdShowCart: false    //加入购物车成功模态框
    }
  },
  components:{
    NavHeader,
    NavFooter,
    NavBread,
    modal
  },
  mounted: function() {

    this.getGoodsList()
  },
  methods:{
    getGoodsList(flag) {
      var param = {
        page:this.page,
        pageSize:this.pageSize,
        sort:this.sortFlag?1:-1,
        priceRange:this.priceSelected
      }
      this.loading = true
      axios.get("/goods/list", {params:param}).then((result)=>{
        var res = result.data
        this.loading = false
        if (res.code == 0) {
          if (flag) {
            this.goodsList = this.goodsList.concat(res.data)
            if (res.data.length == 0) {
              this.busy = true
            } else {
              this.busy = false
            }
          } else {
            this.goodsList = res.data
            this.busy = false
          }
        } else {
          this.goodsList = []
        }
      })
    },
    //移动屏展示右侧
    showPriceBar() {
      this.showTopBar = true
      this.showMask = true
    },
    //移动屏，关闭遮罩
    closeTop(){
      this.showMask = false
      this.showTopBar = false
    },
    //选择某一个价格区间
    selectedOne(index){
      this.priceSelected = index
      this.closeTop(),
      this.page = 1,
      this.getGoodsList()
    },
    //排序
    sortGoods() {
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodsList();

    },
    //加载更多
    loadMore(){
      this.busy = true;
      setTimeout(() => {
        this.page++
        this.getGoodsList(true)
      }, 500);
    },

    //添加购物车
    addCart(productId) {
      axios.post("/goods/addCart", {productId: productId}).then((result) => {
        var res = result.data;
        if (res.code == 0) {
          this.mdShowCart = true
          this.$store.commit('updateCart', 1);
        } else {
          this.mdShow = true;
        }
      }) 
    },
    closeModal() {
      this.mdShow = false
    } 
  }
    
}
</script>

<style>
  .sort-up{
    transform: rotate(180deg);
    transition: all .3s ease-out
  }
  .icon-arrow-short{
    width: 11px;
    height: 11px;
    transition: all .3s ease-out
  }
</style>