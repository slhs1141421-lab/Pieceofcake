// Piece of Cake - Core Logic
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Product Data
const PRODUCTS = [
    { id: 'c1', name: '雲朵草莓戚風', price: 280, category: 'cloud', healing: 95, sweetness: 60, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop', desc: '像雲朵一樣輕盈的口感，搭配大湖新鮮草莓。', hasOptions: true },
    { id: 'c2', name: '伯爵奶茶雲朵', price: 260, category: 'cloud', healing: 90, sweetness: 45, image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=800&auto=format&fit=crop', desc: '佛手柑香氣與綿密戚風的完美邂逅。', hasOptions: true },
    { id: 'c3', name: '靜岡抹茶雲朵', price: 280, category: 'cloud', healing: 92, sweetness: 35, image: 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?q=80&w=800&auto=format&fit=crop', desc: '選用靜岡特等抹茶，苦甜適中的優雅滋味。', hasOptions: true },
    { id: 'c4', name: '玫瑰荔枝戚風', price: 300, category: 'cloud', healing: 98, sweetness: 50, image: 'https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?q=80&w=800&auto=format&fit=crop', desc: '浪漫的玫瑰花香與清甜荔枝，少女心爆發。', hasOptions: true },
    { id: 'c5', name: '蜂蜜柚子生乳捲', price: 240, category: 'cloud', healing: 89, sweetness: 40, image: 'https://images.unsplash.com/photo-1519340241574-2dec4992408e?q=80&w=800&auto=format&fit=crop', desc: '清爽的柚子香氣，搭配純淨蜂蜜的甘甜。', hasOptions: true },
    { id: 'a1', name: '熔岩黑巧克力塔', price: 320, category: 'adult', healing: 88, sweetness: 30, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop', desc: '70% 苦甜巧克力，大人的深邃滋味。', hasOptions: true },
    { id: 'a2', name: '威士秘焦 caramel 布丁', price: 180, category: 'adult', healing: 85, sweetness: 40, image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=800&auto=format&fit=crop', desc: '微醺的焦糖香氣，適合深夜的自我療癒。' },
    { id: 'a3', name: '提拉米蘇微醺塔', price: 290, category: 'adult', healing: 94, sweetness: 35, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800&auto=format&fit=crop', desc: '馬斯卡彭起司與咖啡酒的經典交響。', hasOptions: true },
    { id: 'a4', name: '蘭姆葡萄夾心餅', price: 220, category: 'adult', healing: 87, sweetness: 45, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop', desc: '蘭姆酒浸漬葡萄乾，成熟優雅的午茶點心。' },
    { id: 'a5', name: '紅酒燉洋梨塔', price: 310, category: 'adult', healing: 91, sweetness: 30, image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?q=80&w=800&auto=format&fit=crop', desc: '紅酒慢火燉煮洋梨，散發迷人的果木香氣。', hasOptions: true },
];

// Gift Box Data (Separated from regular products)
const GIFT_BOXES = [
    { id: 'gb1', name: '自選禮盒 大理石款', price: 150, category: 'box', image: 'https://m.media-amazon.com/images/I/71Y-D7N-Z9L._AC_SL1500_.jpg', hasOptions: true, isBox: true },
    { id: 'gb2', name: '自選禮盒 粉櫻款', price: 150, category: 'box', image: 'https://m.media-amazon.com/images/I/71TPpzXr4ML._AC_UF894,1000_QL80_.jpg', hasOptions: true, isBox: true },
    { id: 'gb3', name: '薄荷清新蛋糕盒', price: 150, category: 'box', image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=800&auto=format&fit=crop', hasOptions: true, isBox: true },
    { id: 'gb4', name: '自選禮盒 壓克力款', price: 250, category: 'box', image: 'https://m.media-amazon.com/images/I/61I2M0L-u4L._AC_SL1001_.jpg', hasOptions: true, isBox: true },
    { id: 'gb5', name: '薰衣草紫色蛋糕盒', price: 150, category: 'box', image: 'https://images.unsplash.com/photo-1572352865069-9d3c63824f94?q=80&w=800&auto=format&fit=crop', hasOptions: true, isBox: true }
];

// Cart State Management (LocalStorage)
let cart = JSON.parse(localStorage.getItem('poc_cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader & Page Transitions
    const loader = document.getElementById('loader');
    const runningCake = document.getElementById('running-cake');
    const loaderText = document.getElementById('loader-text');

    function hideLoader() {
        if (!loader) return;
        const tl = gsap.timeline();
        
        tl.to(runningCake, {
            x: 100,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.in'
        })
        .to(loaderText, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in'
        }, "-=0.4")
        .to(loader, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                loader.style.display = 'none';
                initAnimations();
            }
        }, "-=0.3");
    }

    function showLoader(callback) {
        if (!loader) {
            callback();
            return;
        }
        
        loader.style.display = 'flex';
        const tl = gsap.timeline();
        
        tl.fromTo(loader, { opacity: 0 }, { opacity: 1, duration: 0.5 })
          .fromTo(runningCake, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, "-=0.2")
          .fromTo(loaderText, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, onComplete: callback }, "-=0.4");
    }

    if (loader) {
        window.addEventListener('load', hideLoader);
        // Safety timeout in case load event takes too long
        setTimeout(hideLoader, 3000);
    }

    // Handle Nav Transitions
    document.querySelectorAll('nav a, .logo-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.endsWith('.html') && !href.startsWith('#')) {
                e.preventDefault();
                showLoader(() => {
                    window.location.href = href;
                });
            }
        });
    });

    // 2. Progress Bar
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        gsap.to(progressBar, {
            width: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3
            }
        });
    }

    // 3. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        ScrollTrigger.create({
            start: 'top -50',
            onUpdate: (self) => {
                if (self.direction === 1) {
                    navbar.classList.add('scrolled');
                } else if (self.scroll() < 50) {
                    navbar.classList.remove('scrolled');
                }
            }
        });
    }

    // 4. Shopping Cart Logic
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartToggle = document.getElementById('cart-toggle');
    const closeCart = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const emptyCartMsg = document.getElementById('empty-cart-msg');

    function toggleCart() {
        if (!cartDrawer) return;
        const isOpen = cartDrawer.classList.contains('translate-x-0');
        if (isOpen) {
            cartDrawer.classList.add('translate-x-full');
            cartDrawer.classList.remove('translate-x-0');
            cartOverlay.classList.add('opacity-0', 'pointer-events-none');
        } else {
            cartDrawer.classList.remove('translate-x-full');
            cartDrawer.classList.add('translate-x-0');
            cartOverlay.classList.remove('opacity-0', 'pointer-events-none');
        }
    }

    if (cartToggle) cartToggle.addEventListener('click', toggleCart);
    if (closeCart) closeCart.addEventListener('click', toggleCart);
    if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);

    function updateCartUI() {
        if (!cartItemsContainer) return;
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let count = 0;

        if (cart.length === 0) {
            if (emptyCartMsg) cartItemsContainer.appendChild(emptyCartMsg);
            cartCount.classList.add('hidden');
        } else {
            cartCount.classList.remove('hidden');
            cart.forEach((item, index) => {
                total += item.price * item.quantity;
                count += item.quantity;

                const itemEl = document.createElement('div');
                itemEl.className = 'flex items-start space-x-4 border-b border-ink/5 pb-6 last:border-0';
                
                let optionsHtml = '';
                if (item.options) {
                    let optionsText = '';
                    if (item.options.giftAddons) {
                        optionsText = `<span class="text-[9px] bg-accent text-ink px-1.5 py-0.5 rounded font-bold">加購: ${item.options.giftAddons}</span>`;
                    } else {
                        optionsText = `
                            <span class="text-[9px] bg-berry/10 text-berry px-1.5 py-0.5 rounded font-bold">${item.options.size}</span>
                            <span class="text-[9px] bg-ink/5 text-ink px-1.5 py-0.5 rounded font-bold">蠟燭: ${item.options.candle}</span>
                            <span class="text-[9px] bg-ink/5 text-ink px-1.5 py-0.5 rounded font-bold">餐具: ${item.options.tableware || '1組'}</span>
                        `;
                    }

                    optionsHtml = `
                        <div class="mt-1 space-y-1">
                            <div class="flex flex-wrap gap-2">
                                ${optionsText}
                            </div>
                            ${item.options.remarks ? `<p class="text-[9px] text-ink/40 line-clamp-1 italic">備註: ${item.options.remarks}</p>` : ''}
                        </div>
                    `;
                }

                itemEl.innerHTML = `
                    <div class="w-16 h-16 rounded-xl overflow-hidden bg-cake-dark shrink-0">
                        <img src="${item.image}" referrerpolicy="no-referrer" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1">
                        <h4 class="text-xs font-bold text-ink">${item.name}</h4>
                        ${optionsHtml}
                        <div class="flex items-center justify-between mt-3">
                            <div class="flex items-center space-x-3 bg-white/50 rounded-full px-2 py-1">
                                <button class="decrease-qty w-5 h-5 flex items-center justify-center hover:text-berry transition-colors font-bold text-xs" data-index="${index}">-</button>
                                <span class="text-xs font-bold w-4 text-center">${item.quantity}</span>
                                <button class="increase-qty w-5 h-5 flex items-center justify-center hover:text-berry transition-colors font-bold text-xs" data-index="${index}">+</button>
                            </div>
                            <span class="text-[11px] font-bold text-berry">NT$ ${item.price * item.quantity}</span>
                        </div>
                    </div>
                    <button class="remove-item p-2 opacity-20 hover:opacity-100 transition-opacity hover:text-berry" data-index="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
        }

        cartTotal.textContent = `NT$ ${total}`;
        cartCount.textContent = count;
        localStorage.setItem('poc_cart', JSON.stringify(cart));

        // Re-attach listeners
        document.querySelectorAll('.decrease-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }
                updateCartUI();
            });
        });

        document.querySelectorAll('.increase-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cart[index].quantity++;
                updateCartUI();
            });
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.currentTarget.dataset.index;
                cart.splice(index, 1);
                updateCartUI();
            });
        });
    }

    // Add to Cart Event Delegation
    document.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart')) {
            const btn = e.target.closest('.add-to-cart');
            const card = btn.closest('[data-id]') || btn;
            const id = card.dataset.id;
            const product = PRODUCTS.find(p => p.id === id) || GIFT_BOXES.find(p => p.id === id);

            if (product && product.hasOptions) {
                openOptionsModal(product);
            } else {
                const name = card.dataset.name;
                const price = parseInt(card.dataset.price);
                const image = card.dataset.image;

                const existingItem = cart.find(item => item.id === id);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({ id, name, price, image, quantity: 1 });
                }

                updateCartUI();
                toggleCart();
            }
        }
    });

    // 4.5 Product Options Modal Logic
    const optionsModal = document.getElementById('options-modal');
    const optionsOverlay = document.getElementById('options-overlay');
    const closeOptionsBtn = document.getElementById('close-options');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductBasePrice = document.getElementById('modal-product-base-price');
    const modalTotalPrice = document.getElementById('modal-total-price');
    const modalConfirmAdd = document.getElementById('modal-confirm-add');
    const ageInputContainer = document.getElementById('age-input-container');
    const boxOptionsContainer = document.getElementById('box-options-container');
    const cakeOptionsContainer = document.getElementById('cake-options-container');
    const candleOptionsContainer = document.getElementById('candle-options-container');
    const tablewareOptionsContainer = document.getElementById('tableware-options-container');
    const decreaseTablewareBtn = document.getElementById('decrease-tableware');
    const increaseTablewareBtn = document.getElementById('increase-tableware');
    const tablewareQtyDisplay = document.getElementById('tableware-qty');
    let tablewareQtyValue = 1;
    
    const addLightsBox = document.getElementById('add-lights');
    const addFlowersBox = document.getElementById('add-flowers');
    const addCardBox = document.getElementById('add-card');

    const candleAgeInput = document.getElementById('candle-age');
    const orderRemarks = document.getElementById('order-remarks');

    let currentOptionProduct = null;

    function updateModalPrice() {
        if (!currentOptionProduct) return;
        let total = currentOptionProduct.price;

        if (currentOptionProduct.isBox) {
            if (addLightsBox?.checked) total += parseInt(addLightsBox.dataset.price);
            if (addFlowersBox?.checked) total += parseInt(addFlowersBox.dataset.price);
            if (addCardBox?.checked) total += parseInt(addCardBox.dataset.price);
        } else {
            const selectedSize = document.querySelector('input[name="size"]:checked').value;
            if (selectedSize === '6吋') total += 400;
            if (selectedSize === '8吋') total += 800;
        }
        
        modalTotalPrice.textContent = `NT$ ${total}`;
    }

    if (optionsModal) {
        document.querySelectorAll('input[name="size"]').forEach(radio => {
            radio.addEventListener('change', updateModalPrice);
        });

        // Box option changes
        [addLightsBox, addFlowersBox, addCardBox].forEach(box => {
            box?.addEventListener('change', updateModalPrice);
        });

        document.querySelectorAll('input[name="candle"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === '數字蠟燭') {
                    ageInputContainer?.classList.remove('hidden');
                } else {
                    ageInputContainer?.classList.add('hidden');
                }
            });
        });

        if (decreaseTablewareBtn) {
            decreaseTablewareBtn.addEventListener('click', () => {
                if (tablewareQtyValue > 0) {
                    tablewareQtyValue--;
                    tablewareQtyDisplay.textContent = tablewareQtyValue;
                }
            });
        }
        if (increaseTablewareBtn) {
            increaseTablewareBtn.addEventListener('click', () => {
                tablewareQtyValue++;
                tablewareQtyDisplay.textContent = tablewareQtyValue;
            });
        }

        if (modalConfirmAdd) {
            modalConfirmAdd.addEventListener('click', () => {
                let options = {};
                let finalPrice = currentOptionProduct.price;
                let idSuffix = "";

                if (currentOptionProduct.isBox) {
                    const lights = addLightsBox?.checked;
                    const flowers = addFlowersBox?.checked;
                    const card = addCardBox?.checked;
                    
                    if (lights) finalPrice += 50;
                    if (flowers) finalPrice += 120;
                    if (card) finalPrice += 30;

                    options = {
                        giftAddons: [
                            lights ? "暖光燈飾" : null,
                            flowers ? "不凋小花束" : null,
                            card ? "代寫卡片" : null
                        ].filter(Boolean).join(", ") || "無加購",
                        remarks: orderRemarks.value
                    };
                    idSuffix = `-${lights}-${flowers}-${card}`;
                } else {
                    const size = document.querySelector('input[name="size"]:checked').value;
                    const candle = document.querySelector('input[name="candle"]:checked').value;
                    const age = candle === '數字蠟燭' ? candleAgeInput.value : '';
                    
                    if (size === '6吋') finalPrice += 400;
                    if (size === '8吋') finalPrice += 800;

                    options = {
                        size,
                        candle: candle === '數字蠟燭' ? `${candle}(${age}歲)` : candle,
                        tableware: `${tablewareQtyValue}組`,
                        remarks: orderRemarks.value
                    };
                    idSuffix = `-${size}-${candle}-${age}-${tablewareQtyValue}`;
                }

                const cartItem = {
                    id: `${currentOptionProduct.id}${idSuffix}`,
                    name: currentOptionProduct.name,
                    baseId: currentOptionProduct.id,
                    price: finalPrice,
                    image: currentOptionProduct.image,
                    quantity: 1,
                    options: options
                };

                const existingIndex = cart.findIndex(item => item.id === cartItem.id);
                if (existingIndex > -1) {
                    cart[existingIndex].quantity++;
                } else {
                    cart.push(cartItem);
                }

                updateCartUI();
                closeOptionsModal();
                toggleCart();
            });
        }
    }

    function openOptionsModal(product) {
        currentOptionProduct = product;
        modalProductName.textContent = product.name;
        modalProductBasePrice.textContent = `基礎價 NT$ ${product.price}`;
        const modalImg = document.getElementById('modal-product-image');
        if (modalImg) modalImg.src = product.image;
        
        // Reset fields
        if (orderRemarks) orderRemarks.value = '';
        if (candleAgeInput) candleAgeInput.value = '';
        if (addLightsBox) addLightsBox.checked = false;
        if (addFlowersBox) addFlowersBox.checked = false;
        if (addCardBox) addCardBox.checked = false;
        
        const defaultSize = document.querySelector('input[name="size"][value="4吋"]');
        if (defaultSize) defaultSize.checked = true;
        
        const defaultCandle = document.querySelector('input[name="candle"][value="無"]');
        if (defaultCandle) defaultCandle.checked = true;

        tablewareQtyValue = 1;
        if (tablewareQtyDisplay) tablewareQtyDisplay.textContent = tablewareQtyValue;

        // Toggle sections
        if (product.isBox) {
            boxOptionsContainer?.classList.remove('hidden');
            cakeOptionsContainer?.classList.add('hidden');
            candleOptionsContainer?.classList.add('hidden');
            tablewareOptionsContainer?.classList.add('hidden');
        } else {
            boxOptionsContainer?.classList.add('hidden');
            cakeOptionsContainer?.classList.remove('hidden');
            candleOptionsContainer?.classList.remove('hidden');
            tablewareOptionsContainer?.classList.remove('hidden');
        }

        ageInputContainer?.classList.add('hidden');
        updateModalPrice();
        optionsModal.classList.remove('hidden');
        optionsModal.classList.add('flex');
    }

    function closeOptionsModal() {
        optionsModal.classList.add('hidden');
        optionsModal.classList.remove('flex');
        currentOptionProduct = null;
    }

    if (closeOptionsBtn) closeOptionsBtn.addEventListener('click', closeOptionsModal);
    if (optionsOverlay) optionsOverlay.addEventListener('click', closeOptionsModal);

    // Initial Cart UI Update
    updateCartUI();

    // 5. Mood Buttons Interaction
    const moodBtns = document.querySelectorAll('.mood-btn');
    moodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const mood = btn.dataset.mood;
            if (window.location.pathname.includes('mood.html')) {
                filterMood(mood);
            } else {
                showLoader(() => {
                    window.location.href = `mood.html?mood=${mood}`;
                });
            }
        });
    });

    // 6. Page Specific Logic
    const path = window.location.pathname;

    if (path.includes('healing.html')) {
        initHealingPage();
    } else if (path.includes('gift.html')) {
        initGiftPage();
    } else if (path.includes('mood.html')) {
        initMoodPage();
    }

    function initAnimations() {
        // Hero Content
        gsap.to('.hero-content', {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out',
            delay: 0.5
        });

        // Enhanced Parallax Layers (Inspired by but.com.tw)
        gsap.utils.toArray('.parallax-layer').forEach(layer => {
            const speed = layer.dataset.speed || 0.5;
            gsap.to(layer, {
                y: (i, target) => -ScrollTrigger.maxScroll(window) * speed * 0.1,
                ease: 'none',
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true
                }
            });
        });

        // Hero Background Parallax
        gsap.to('.hero-bg', {
            yPercent: 15,
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
                trigger: 'section',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // General Fade In Elements with Stagger
        gsap.utils.toArray('.fade-in').forEach((el) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            });
        });

        // Product Cards with back ease for "cute" feel
        gsap.utils.toArray('.product-card').forEach((card, i) => {
            gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'back.out(1.2)',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                delay: i * 0.1
            });
        });

        // Parallax Image in Features
        gsap.to('.img-parallax-1', {
            y: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.img-parallax-1',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // Healing Page Logic
    function initHealingPage() {
        const grid = document.getElementById('healing-grid');
        if (!grid) return;

        function renderHealingProducts(category = 'all') {
            grid.innerHTML = '';
            const filtered = category === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === category);
            
            filtered.forEach(p => {
                const el = document.createElement('div');
                el.className = 'product-card opacity-0 translate-y-10 group';
                el.dataset.id = p.id;
                el.dataset.name = p.name;
                el.dataset.price = p.price;
                el.dataset.image = p.image;
                
                el.innerHTML = `
                    <div class="relative aspect-square overflow-hidden bg-cake-dark mb-6 rounded-3xl shadow-lg">
                        <img src="${p.image}" referrerpolicy="no-referrer" class="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000">
                        <div class="absolute top-4 left-4 flex flex-col space-y-2">
                            <span class="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold">療癒指數 ${p.healing}%</span>
                            <span class="bg-berry/90 backdrop-blur text-white px-3 py-1 rounded-full text-[10px] font-bold">甜度 ${p.sweetness}%</span>
                        </div>
                        <button class="add-to-cart absolute bottom-6 right-6 w-14 h-14 bg-ink text-cake rounded-full flex items-center justify-center translate-y-0 opacity-100 transition-all duration-500 shadow-2xl hover:bg-berry hover:text-white btn-cute">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                        </button>
                    </div>
                    <div class="px-2">
                        <h4 class="text-xl font-display font-bold">${p.name}</h4>
                        <p class="text-xs opacity-60 mb-4">${p.desc}</p>
                        <span class="text-lg font-bold text-berry">NT$ ${p.price}</span>
                    </div>
                `;
                grid.appendChild(el);
            });
            
            // Re-trigger animations
            gsap.to('.product-card', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }

        renderHealingProducts();

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('bg-ink', 'text-cake'));
                btn.classList.add('bg-ink', 'text-cake');
                renderHealingProducts(btn.dataset.category);
            });
        });
    }

    // Gift Page Logic
    function initGiftPage() {
        const cardInput = document.getElementById('card-text');
        const cardPreview = document.getElementById('card-preview-text');
        const fontSelect = document.getElementById('font-select');
        
        if (cardInput && cardPreview) {
            cardInput.addEventListener('input', (e) => {
                cardPreview.textContent = e.target.value || '在此輸入您的祝福...';
            });
        }

        if (fontSelect && cardPreview) {
            fontSelect.addEventListener('change', (e) => {
                cardPreview.style.fontFamily = e.target.value;
            });
        }

        // Box selection logic
        const boxOptions = document.querySelectorAll('.box-option');
        const confirmBtn = document.getElementById('confirm-gift-btn');

        boxOptions.forEach(box => {
            box.addEventListener('click', () => {
                boxOptions.forEach(b => b.classList.remove('ring-4', 'ring-berry'));
                box.classList.add('ring-4', 'ring-berry');
                
                if (confirmBtn) {
                    confirmBtn.dataset.id = box.dataset.boxId;
                    confirmBtn.dataset.name = box.dataset.name;
                    confirmBtn.dataset.price = box.dataset.price;
                    confirmBtn.dataset.image = box.dataset.image;
                    confirmBtn.textContent = `選用 ${box.dataset.name} 並選擇裝飾`;
                    
                    // Update preview fee if needed
                    const packagingFee = document.querySelector('.packaging-fee');
                    const previewTotal = document.getElementById('preview-total');
                    if (packagingFee) packagingFee.textContent = `NT$ ${box.dataset.price}`;
                    if (previewTotal) previewTotal.textContent = `NT$ ${box.dataset.price}`;
                }
            });
        });
    }

    // Mood Page Logic
    function initMoodPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const initialMood = urlParams.get('mood');
        if (initialMood) {
            filterMood(initialMood);
        }
    }

    function filterMood(mood) {
        const moodDisplay = document.getElementById('selected-mood-name');
        const moodResult = document.getElementById('mood-result');
        const moodPlaceholder = document.getElementById('mood-placeholder');
        const moodHeader = document.getElementById('mood-result-header');
        
        if (!moodDisplay || !moodResult) return;

        if (moodPlaceholder) moodPlaceholder.classList.add('hidden');
        if (moodHeader) moodHeader.classList.remove('hidden');

        const moods = {
            happy: { name: '開心', desc: '這份喜悅值得用最甜美的草莓來慶祝！', dessert: PRODUCTS.find(p => p.id === 'c1') },
            sad: { name: '傷心', desc: '讓濃郁的巧克力擁抱你，壞心情都會融化的。', dessert: PRODUCTS.find(p => p.id === 'a1') },
            angry: { name: '生氣', desc: '焦糖海鹽的鹹甜交織，能平息你心中的怒火。', dessert: PRODUCTS.find(p => p.id === 'h1') },
            nervous: { name: '緊張', desc: '伯爵茶的清香能舒緩你的神經，放輕鬆。', dessert: PRODUCTS.find(p => p.id === 'c2') },
            calm: { name: '平靜', desc: '微醺的布丁，最適合享受這份寧靜的時光。', dessert: PRODUCTS.find(p => p.id === 'a2') }
        };

        const data = moods[mood];
        if (!data) return;

        moodDisplay.textContent = data.name;
        moodResult.innerHTML = `
            <div class="max-w-md mx-auto bg-white p-8 rounded-[40px] shadow-2xl fade-in opacity-0 translate-y-10 border border-ink/5">
                <div class="aspect-square rounded-3xl overflow-hidden mb-6 shadow-inner">
                    <img src="${data.dessert.image}" referrerpolicy="no-referrer" class="w-full h-full object-cover">
                </div>
                <div class="text-left">
                    <h3 class="text-2xl font-display font-bold mb-2">${data.dessert.name}</h3>
                    <p class="text-sm opacity-60 mb-6 leading-relaxed">${data.desc}</p>
                    <div class="flex justify-between items-center pt-6 border-t border-ink/5">
                        <span class="text-xl font-bold text-berry">NT$ ${data.dessert.price}</span>
                        <button class="add-to-cart bg-ink text-cake px-8 py-4 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-berry transition-colors btn-cute" 
                                data-id="${data.dessert.id}" data-name="${data.dessert.name}" data-price="${data.dessert.price}" data-image="${data.dessert.image}">
                            加入處方
                        </button>
                    </div>
                </div>
            </div>
        `;

        gsap.fromTo('.fade-in', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    }
});
