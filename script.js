const products=[
{id:1,name:"سماعة لاسلكية عازلة للضوضاء",cat:"إلكترونيات",price:49.9,old:69.9,emoji:"🎧",rating:"★★★★★",tag:"خصم 29%"},
{id:2,name:"ساعة ذكية رياضية",cat:"إلكترونيات",price:89,old:119,emoji:"⌚",rating:"★★★★☆",tag:"الأكثر طلباً"},
{id:3,name:"حقيبة ظهر يومية",cat:"أزياء",price:35,old:0,emoji:"🎒",rating:"★★★★★",tag:""},
{id:4,name:"مصباح مكتبي LED",cat:"المنزل",price:24.5,old:32,emoji:"💡",rating:"★★★★☆",tag:"عرض"},
{id:5,name:"حذاء رياضي خفيف",cat:"أزياء",price:72,old:0,emoji:"👟",rating:"★★★★★",tag:""},
{id:6,name:"كاميرا فورية صغيرة",cat:"إلكترونيات",price:110,old:139,emoji:"📷",rating:"★★★★☆",tag:"جديد"},
{id:7,name:"مجموعة عناية بالبشرة",cat:"الجمال",price:42,old:0,emoji:"🧴",rating:"★★★★☆",tag:""},
{id:8,name:"زجاجة ماء حرارية",cat:"الرياضة",price:18,old:25,emoji:"🧃",rating:"★★★★★",tag:"خصم"},
{id:9,name:"نبتة منزلية للديكور",cat:"المنزل",price:27,old:0,emoji:"🪴",rating:"★★★★☆",tag:""},
{id:10,name:"كتاب تطوير المهارات",cat:"الكتب",price:21,old:0,emoji:"📚",rating:"★★★★★",tag:""},
{id:11,name:"لوحة مفاتيح ميكانيكية",cat:"إلكترونيات",price:95,old:125,emoji:"⌨️",rating:"★★★★★",tag:"خصم"},
{id:12,name:"نظارة شمسية عصرية",cat:"أزياء",price:39,old:0,emoji:"🕶️",rating:"★★★★☆",tag:""}
];
const cats=[["الكل","✦"],["إلكترونيات","🎧"],["أزياء","👕"],["المنزل","🛋️"],["الجمال","✨"],["الرياضة","⚽"],["الكتب","📚"]];
let category="الكل",cart=JSON.parse(localStorage.getItem("waseemCart")||"[]");
const $=id=>document.getElementById(id);
function renderCats(){$("categoryList").innerHTML=cats.slice(1).map(c=>`<button class="category" data-cat="${c[0]}"><div class="catIcon">${c[1]}</div><b>${c[0]}</b></button>`).join("");$("chips").innerHTML=cats.map(c=>`<button class="chip ${category===c[0]?"active":""}" data-cat="${c[0]}">${c[0]}</button>`).join("");document.querySelectorAll("[data-cat]").forEach(b=>b.onclick=()=>{category=b.dataset.cat;render()})}
function render(){renderCats();let q=$("search").value.trim().toLowerCase();let list=products.filter(p=>(category==="الكل"||p.cat===category)&&(`${p.name} ${p.cat}`).toLowerCase().includes(q));let sort=$("sort").value;if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);$("productsTitle").textContent=category==="الكل"?"منتجات مميزة":category;$("productGrid").innerHTML=list.length?list.map(p=>`<article class="product"><div class="productPic">${p.tag?`<span class="tag">${p.tag}</span>`:""}${p.emoji}</div><div class="productInfo"><small>${p.cat}</small><h3>${p.name}</h3><div class="rating">${p.rating} <span style="color:#8993a0"> (تقييمات تجريبية)</span></div><div class="priceRow"><span class="price">${p.price.toFixed(2)} ر.س</span><button class="add" data-add="${p.id}">＋ أضف</button></div></div></article>`).join(""):'<div class="empty">لا توجد منتجات مطابقة لبحثك.</div>';document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>add(+b.dataset.add))}
function save(){localStorage.setItem("waseemCart",JSON.stringify(cart));renderCart()}
function add(id){let item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});save();toast("تمت إضافة المنتج إلى السلة")}
function renderCart(){let count=cart.reduce((s,x)=>s+x.qty,0);$("cartCount").textContent=count;$("cartItems").innerHTML=cart.length?cart.map(x=>{let p=products.find(p=>p.id===x.id);return `<div class="cartItem"><span class="cartEmoji">${p.emoji}</span><div><b>${p.name}</b><small>${p.price.toFixed(2)} ر.س</small><div class="qty"><button data-dec="${p.id}">−</button>${x.qty}<button data-inc="${p.id}">＋</button><button data-remove="${p.id}">حذف</button></div></div></div>`}).join(""):'<div class="empty">سلتك فارغة حالياً 🛒</div>';let total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);$("total").textContent=total.toFixed(2)+" ر.س";document.querySelectorAll("[data-inc]").forEach(b=>b.onclick=()=>change(+b.dataset.inc,1));document.querySelectorAll("[data-dec]").forEach(b=>b.onclick=()=>change(+b.dataset.dec,-1));document.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{cart=cart.filter(x=>x.id!==+b.dataset.remove);save()})}
function change(id,n){let x=cart.find(x=>x.id===id);x.qty+=n;if(x.qty<1)cart=cart.filter(y=>y.id!==id);save()}
function toggleCart(open){$("drawer").classList.toggle("open",open);$("overlay").classList.toggle("show",open)}
let toastTimer;function toast(t){$("toast").textContent=t;$("toast").classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("toast").classList.remove("show"),2100)}
$("openCart").onclick=()=>toggleCart(true);$("closeCart").onclick=()=>toggleCart(false);$("overlay").onclick=()=>toggleCart(false);$("search").oninput=render;$("searchBtn").onclick=()=>{render();$("products").scrollIntoView({behavior:"smooth"})};$("sort").onchange=render;$("checkout").onclick=()=>toast("إتمام الطلب غير متاح في النسخة التجريبية");render();renderCart();
