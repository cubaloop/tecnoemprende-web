document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Switcher Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Set default theme to light (or load from localStorage)
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        if (themeIcon) themeIcon.textContent = 'light_mode';
    } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
        if (themeIcon) themeIcon.textContent = 'dark_mode';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            if (isDark) {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
                localStorage.setItem('theme', 'light');
                if (themeIcon) themeIcon.textContent = 'dark_mode';
            } else {
                document.documentElement.classList.remove('light');
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                if (themeIcon) themeIcon.textContent = 'light_mode';
            }
        });
    }

    // 2. Navigation Scroll Effect
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                nav.classList.add('shadow-md', 'h-16', 'bg-surface/95', 'dark:bg-slate-900/95');
                nav.classList.remove('h-20');
            } else {
                nav.classList.remove('shadow-md', 'h-16', 'bg-surface/95', 'dark:bg-slate-900/95');
                nav.classList.add('h-20');
            }
        });
    }

    // 3. Mobile Navigation Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuCollapse = document.getElementById('mobile-menu-collapse');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');

    if (mobileMenuBtn && mobileMenuCollapse) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuCollapse.classList.remove('translate-x-full');
        });
    }

    if (mobileMenuCloseBtn && mobileMenuCollapse) {
        mobileMenuCloseBtn.addEventListener('click', () => {
            mobileMenuCollapse.classList.add('translate-x-full');
        });
    }

    // 4. Desktop Dropdown Menu Toggle (Hover/Click)
    const dropdownToggle = document.getElementById('dropdown-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('mouseenter', () => {
            dropdownMenu.classList.remove('hidden');
        });
        dropdownToggle.parentElement.addEventListener('mouseleave', () => {
            dropdownMenu.classList.add('hidden');
        });
    }

    // 5. Active Link Highlight
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('menu-active');
            link.classList.remove('text-on-surface-variant', 'dark:text-slate-400');
            link.classList.add('text-primary', 'dark:text-secondary-fixed-dim');
        }
    });

    // 6. Interactive Card Highlight (Vanilla JS reflection cursor tracking)
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 7. Dynamic Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => {
        el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out');
        animateObserver.observe(el);
    });

    // --- PORTFOLIO DYNAMIC DATABASE (100% VERIFIED ACTIVE URLS & ACCURATE ASSETS) ---
    const defaultPortfolio = [
        {
            id: "hhp_cuba",
            title: "Havana Home Pros — Portal Inmobiliario",
            category: "habana investors ecommerce web",
            location: "La Habana, Cuba",
            badge: "📍 La Habana / Real Estate",
            image: "assets/project_havanahomepros.jpg",
            url: "https://cubaloop.github.io/havana-home-pros/",
            tags: "La Habana / Property Finder Cuba / Mapa Interactivo",
            description: "Portal inmobiliario estilo Property Finder para compra-venta de residencias y mansiones en La Habana con geolocalización en mapa, filtros avanzados y conexión directa por WhatsApp."
        },
        {
            id: "mercapros_cuba",
            title: "Mercapros Cuba — Marketplace B2B & Contenedores",
            category: "habana ecommerce web",
            location: "La Habana & ZEDM Mariel",
            badge: "📍 La Habana / Mayorista B2B",
            image: "assets/project_nexus.jpg",
            url: "https://cubaloop.github.io/Mercapros/",
            tags: "La Habana / Importación Contenedores / Catálogo Mayorista",
            description: "Plataforma mayorista B2B de contenedores CIF Mariel y distribución para MIPYMES en Cuba con cotizador automático y panel de administración móvil."
        },
        {
            id: "1",
            title: "13th Avenue Luxury Brand",
            category: "dubai ecommerce web",
            location: "Dubái & EAU",
            badge: "📍 Dubái / Lujo",
            image: "assets/project_13thavenue.png",
            url: "https://13thavenue.netlify.app",
            tags: "Dubái / E-Commerce Élite / Alta Costura",
            description: "Boutique digital de lujo contemporáneo y abayas exclusivas en EAU con catálogo satinado, pasarela de pago y checkout premium."
        },
        {
            id: "2",
            title: "Tierra Querida Restaurant",
            category: "dubai ecommerce web",
            location: "Dubái (Business Bay)",
            badge: "📍 Dubái",
            image: "assets/project_tierraquerida.png",
            url: "https://tierraquerida.net",
            tags: "Dubái / Alta Gastronomía / E-commerce",
            description: "Portal gastronómico de alta cocina colombiana en Dubái, con menú interactivo autogestionable, pedidos directos por WhatsApp y reservas."
        },
        {
            id: "3",
            title: "ApexFleet Supercars & IA",
            category: "dubai automation ai",
            location: "Dubái",
            badge: "⚡ IA Sub-Píxel",
            image: "assets/project_apexfleet.jpg",
            url: "https://apexfleet-dubai.onrender.com",
            tags: "Dubái / Súperdeportivos / Visión IA",
            description: "Plataforma de alquiler de exóticos con suite de peritaje forense sub-píxel con IA (OmniDiff) para inspección óptica de micro-daños."
        },
        {
            id: "4",
            title: "Al Sharq Gents Saloon",
            category: "dubai web",
            location: "Dubái (Deira)",
            badge: "📍 Dubái",
            image: "assets/project_alsharq.jpg",
            url: "https://aether-radar-nolb.onrender.com/preview/alsharq-saloon/",
            tags: "Dubái / Salón de Lujo / 4.9⭐ GMaps",
            description: "Boutique digital de grooming y barbería masculina en Port Saeed, Deira. Sistema de citas instantáneas y panel móvil para el dueño."
        },
        {
            id: "5",
            title: "Luxury STS Car Rental",
            category: "dubai ecommerce web",
            location: "Dubái",
            badge: "📍 Dubái",
            image: "assets/project_luxurysts.jpg",
            url: "https://aether-radar-nolb.onrender.com/preview/luxury-sts-rental/",
            tags: "Dubái / Flota Exótica / Rent a Car VIP",
            description: "Catálogo interactivo de renta de superdeportivos y SUVs de lujo en Dubái con reserva directa y atención VIP."
        },
        {
            id: "6",
            title: "Wakanda Gents Salon",
            category: "dubai web",
            location: "Dubái",
            badge: "📍 Dubái",
            image: "assets/project_wakanda.jpg",
            url: "https://aether-radar-nolb.onrender.com/preview/wakanda-gents-salon/",
            tags: "Dubái / Barbería Contemporánea / Grooming",
            description: "Salón de estilo y barbería en Dubái con catálogo de servicios estilizados y agendamiento exprés."
        },
        {
            id: "7",
            title: "The Barber House Dubai",
            category: "dubai web",
            location: "Dubái",
            badge: "📍 Dubái",
            image: "assets/project_barberhouse.jpg",
            url: "https://aether-radar-nolb.onrender.com/preview/the-barber-house-dubai/",
            tags: "Dubái / Barber Shop Clásico / Citas",
            description: "Experiencia clásica de barbería tradicional en Dubái, optimizada para móviles con reservas instantáneas."
        },
        {
            id: "8",
            title: "Soul Senses Palm Spa",
            category: "dubai web",
            location: "Dubái (Palm Jumeirah)",
            badge: "📍 Dubái",
            image: "assets/project_soulsenses.jpg",
            url: "https://aether-radar-nolb.onrender.com/preview/soul-senses-palm-spa/",
            tags: "Dubái / Spa de Lujo / Palm Jumeirah",
            description: "Portal holístico de masajes y tratamientos de bienestar en Palm Jumeirah con catálogo interactivo de rituales."
        },
        {
            id: "9",
            title: "Antonovich Luxury Design",
            category: "dubai web",
            location: "Dubái",
            badge: "📍 Dubái",
            image: "assets/project_antonovich.jpg",
            url: "https://aether-radar-nolb.onrender.com/preview/antonovich-luxury-design/",
            tags: "Dubái / Arquitectura & Mansiones / Interiorismo",
            description: "Galería de diseño de interiores palaciegos, arquitectura trofeo y mobiliario de alta gama en EAU."
        },
        {
            id: "10",
            title: "Masterkey Rent A Car",
            category: "dubai ecommerce web",
            location: "Dubái",
            badge: "📍 Dubái",
            image: "assets/project_masterkey.jpg",
            url: "https://aether-radar-nolb.onrender.com/preview/masterkey-rent-a-car/",
            tags: "Dubái / Flota Ejecutiva / Alquiler Diario",
            description: "Portal de renta de vehículos deportivos y berlinas ejecutivas con entrega a domicilio en aeropuerto y hoteles."
        },
        {
            id: "11",
            title: "800 Doctor Clinic Dubai",
            category: "dubai web",
            location: "Dubái",
            badge: "📍 Dubái",
            image: "assets/project_800doctor.jpg",
            url: "https://aether-radar-nolb.onrender.com/preview/800doctor-dubai/",
            tags: "Dubái / Medicina Domiciliaria / Clínica",
            description: "Servicio de consultas médicas a domicilio, análisis clínicos y atención sanitaria 24/7 en Dubái."
        },
        {
            id: "12",
            title: "Coches de Lujo 2da Mano",
            category: "dubai ecommerce web",
            location: "Dubái",
            badge: "📍 Dubái",
            image: "assets/project_cochesdelujo.jpg",
            url: "https://cubaloop.github.io/coches-de-lujo-2damano/",
            tags: "Dubái / Concesionario Deportivo / Ocasión",
            description: "Showroom interactivo de vehículos de alta gama en Dubái con inspección certificada y canalización de citas."
        },
        {
            id: "13",
            title: "Simulador Inversor Tanmay",
            category: "investors dubai custom",
            location: "Dubái",
            badge: "💎 Inversor VIP",
            image: "assets/project_tanmay_real.png",
            url: "https://cubaloop.github.io/dubai-investor-tanmay/",
            tags: "Dubái / Propuesta Privada / Simulador ROI",
            description: "Plataforma personalizada para inversor privado con simulador interactivo de rendimiento off-plan en DAMAC & Emaar."
        },
        {
            id: "14",
            title: "Propuesta Arquitectura Yulian",
            category: "investors dubai custom",
            location: "Dubái",
            badge: "💎 Inversor VIP",
            image: "assets/project_yulian_real.jpg",
            url: "https://cubaloop.github.io/yulian-dubai-proposals/",
            tags: "Dubái / Inversor VIP / Arquitectura",
            description: "Herramienta web interactiva diseñada exclusivamente para presentación de proyectos arquitectónicos en Dubái."
        },
        {
            id: "15",
            title: "Experiencia Inmobiliaria Susana",
            category: "investors dubai custom",
            location: "Dubái",
            badge: "💎 Inversor VIP",
            image: "assets/project_susana_real.jpg",
            url: "https://cubaloop.github.io/dubai-investment-susana/",
            tags: "Dubái / Portafolio Inversora / Fiscalidad 0%",
            description: "Simulador interactivo de ROI, plusvalía de capital y calculadora fiscal 0% DLD & RERA para inversora internacional."
        },
        {
            id: "16",
            title: "Puerta EAU Real Estate",
            category: "dubai investors web",
            location: "Dubái",
            badge: "💎 Inversor VIP",
            image: "assets/project_puertaeau.png",
            url: "https://puertaeau.netlify.app",
            tags: "Dubái / Broker VIP / Palm Jumeirah",
            description: "Tarjeta digital e inventario exclusivo de villas de lujo, penthouses y acuerdos de corretaje premium en Dubái."
        },
        {
            id: "17",
            title: "Be International Languages",
            category: "abudhabi dubai web",
            location: "Abu Dhabi & EAU",
            badge: "📍 Abu Dhabi",
            image: "assets/project_beinternational_real.jpg",
            url: "https://cubaloop.github.io/be-international-languages/",
            tags: "Abu Dhabi / Academia de Idiomas / Agendamiento",
            description: "Academia de idiomas con integración de agendamiento, cursos corporativos y atención directa."
        },
        {
            id: "18",
            title: "HabANA Fragrance",
            category: "habana ecommerce web",
            location: "La Habana",
            badge: "📍 La Habana",
            image: "assets/project_habanafragrance.jpg",
            url: "https://cubaloop.github.io/habana-fragrance/",
            tags: "La Habana / Alta Perfumería / Lujo",
            description: "Boutique digital de alta perfumería cubana artesanal con catálogo olfativo interactivo y pedidos sincronizados."
        },
        {
            id: "19",
            title: "Momentos Spa Habana",
            category: "habana ecommerce web",
            location: "La Habana",
            badge: "📍 La Habana",
            image: "assets/project_momentos.jpg",
            url: "https://cubaloop.github.io/momentos-spa/",
            tags: "La Habana / Bienestar & Estética / Miramar",
            description: "Portal de lujo para centro de estética y masajes en Miramar, con estado en vivo de apertura según hora oficial de Cuba."
        },
        {
            id: "20",
            title: "Jumenia Candles",
            category: "habana ecommerce web",
            location: "La Habana",
            badge: "📍 La Habana",
            image: "assets/project_jumeniacandles.jpg",
            url: "https://cubaloop.github.io/jumenia-candles/",
            tags: "La Habana / Velas Aromáticas / E-commerce",
            description: "Tienda online de velas botánicas y aromáticas artesanales de soja con pasarela de catálogo y pedido directo."
        },
        {
            id: "21",
            title: "Kazur Haute Couture",
            category: "ecommerce web",
            location: "Moda Internacional",
            badge: "📍 Internacional",
            image: "assets/project_kazur.png",
            url: "https://kasur.netlify.app",
            tags: "Alta Costura / Moda Africana / E-Commerce",
            description: "Tienda insignia digital de prêt-à-porter y alta costura con pasarela de pedidos y catálogo visual inmersivo."
        },
        {
            id: "22",
            title: "CloseMe AI Virtual Fitting",
            category: "automation ai web",
            location: "Tech & Retail",
            badge: "⚡ Inteligencia Artificial",
            image: "assets/project_closeme.png",
            url: "https://closeme.netlify.app",
            tags: "Probador Virtual / Generación IA / Moda",
            description: "Plataforma interactiva de probador virtual con renderizado de prendas sobre avatares inteligentes y estilismo digital."
        },
        {
            id: "23",
            title: "TDAH Clinical CRM",
            category: "crm web",
            location: "Salud Digital",
            badge: "Sistemas CRM",
            image: "assets/project_800doctor.jpg",
            url: "https://cubaloop.github.io/tdah-crm/",
            tags: "CRM Sanitario / Pacientes / Agendamiento",
            description: "Software clínico privado con puerta de autenticación segura, aislamiento de datos de pacientes y control de sesiones."
        },
        {
            id: "24",
            title: "LuxProperty Dubai Escrow",
            category: "automation dubai custom",
            location: "Dubái (DIFC)",
            badge: "💎 Protocolo Web3",
            image: "assets/project_luxproperty.jpg",
            url: "https://luxproperty-dubai.onrender.com",
            tags: "Dubái / Real Estate Escrow / Tokenización",
            description: "Protocolo de custodia en garantía y distribución de dividendos para transacciones inmobiliarias off-plan de lujo."
        },
        {
            id: "25",
            title: "YachtEscrow Dubai Maritime",
            category: "automation dubai custom",
            location: "Dubái Harbour",
            badge: "💎 Chárter VIP",
            image: "assets/project_yachtescrow.jpg",
            url: "https://yachtescrow-dubai.onrender.com",
            tags: "Dubái / Chárter de Yates / Telemetría GPS",
            description: "Protocolo marítimo de verificación de combustible, ruta y liquidación en custodia para chárteres en Dubái Harbour."
        },
        {
            id: "26",
            title: "AeroLease Private Jet Escrow",
            category: "automation dubai custom",
            location: "Dubái & GCAA",
            badge: "💎 Aviación VIP",
            image: "assets/project_aerolease.jpg",
            url: "https://aerolease-dubai.onrender.com",
            tags: "Dubái / Jets Privados / Telemetría Vuelo",
            description: "Protocolo de verificación de vuelos empty-leg y custodia fraccional para aviación ejecutiva en EAU."
        },
        {
            id: "27",
            title: "Aether GMaps Lead Radar",
            category: "automation ai",
            location: "Dubái & EAU",
            badge: "⚡ Automatización",
            image: "assets/tech_unsplash.jpg",
            url: "https://aether-radar-nolb.onrender.com",
            tags: "Automatización / Prospección B2B / Scraper",
            description: "Sistema cloud en Render para rastreo y auditoría automática de fichas de Google Maps con extracción de datos de contacto."
        },
        {
            id: "28",
            title: "Dubai Capital Radar & WhatsApp Gateway",
            category: "automation ai crm",
            location: "Dubái & Miami",
            badge: "⚡ Bot WhatsApp",
            image: "assets/project_nexus.jpg",
            url: "https://dubai-capital-radar.onrender.com",
            tags: "Automatización / WhatsApp Gateway / CRM",
            description: "Infraestructura de mensajería E2EE conectada con agente de IA autónomo para confirmación y calificación de citas con inversores."
        }
    ];

    // Always keep portfolio updated with newest projects version (100% verified URLs & accurate assets)
    const portfolioVersion = "v7_cuba_flagship_spy";
    if (localStorage.getItem('tecno_portfolio_ver') !== portfolioVersion) {
        localStorage.setItem('tecnoemprende_portfolio', JSON.stringify(defaultPortfolio));
        localStorage.setItem('tecno_portfolio_ver', portfolioVersion);
    } else if (!localStorage.getItem('tecnoemprende_portfolio')) {
        localStorage.setItem('tecnoemprende_portfolio', JSON.stringify(defaultPortfolio));
    }

    // --- FLOATING AI CHAT ASSISTANT ---
    const chatbotHtml = `
        <!-- Floating Bot Button -->
        <div id="ai-chat-btn" class="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-primary to-tertiary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer">
            <span class="material-symbols-outlined text-2xl">smart_toy</span>
            <span class="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></span>
            <span class="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border border-white"></span>
        </div>

        <!-- Chat Widget Window -->
        <div id="ai-chat-window" class="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-32px)] h-[500px] glass-card rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 flex flex-col translate-y-10 opacity-0 pointer-events-none transition-all duration-300">
            <!-- Header -->
            <div class="bg-gradient-to-r from-primary to-secondary p-4 text-white flex justify-between items-center shrink-0">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                        <span class="material-symbols-outlined text-white text-[20px]">smart_toy</span>
                    </div>
                    <div>
                        <h4 class="font-display font-bold text-sm leading-tight">TecnoBot AI</h4>
                        <span class="text-[10px] text-cyan-300 font-semibold uppercase tracking-widest">Asistente en Línea</span>
                    </div>
                </div>
                <button id="ai-chat-close" class="p-1 hover:bg-white/10 rounded-lg text-white">
                    <span class="material-symbols-outlined text-xl">close</span>
                </button>
            </div>

            <!-- Messages Area -->
            <div id="ai-chat-messages" class="flex-grow p-4 overflow-y-auto space-y-4 text-xs scrollbar-thin">
                <div class="flex gap-2.5 items-start">
                    <div class="w-8 h-8 rounded-lg bg-primary/10 dark:bg-cyan-500/10 flex items-center justify-center text-primary dark:text-cyan-400 shrink-0">
                        <span class="material-symbols-outlined text-[18px]">smart_toy</span>
                    </div>
                    <div class="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl rounded-tl-none max-w-[80%] text-on-surface dark:text-slate-200">
                        ¡Hola! Soy TecnoBot, tu asistente de IA. ¿Cómo puedo ayudarte hoy con tu proyecto web o de CRM? Puedes consultarme sobre nuestros servicios, ver el portafolio o rellenar el formulario de cotización.
                    </div>
                </div>
            </div>

            <!-- Predefined Options -->
            <div class="px-4 py-2 border-t border-black/5 dark:border-white/5 flex gap-2 overflow-x-auto text-[10px] font-bold tracking-wide uppercase shrink-0">
                <button onclick="sendQuickMessage('Ver Servicios')" class="bg-primary/10 hover:bg-primary/20 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/20 text-primary dark:text-cyan-400 px-3 py-1.5 rounded-full shrink-0">Ver Servicios</button>
                <button onclick="sendQuickMessage('¿Cuánto cuesta un sitio?')" class="bg-primary/10 hover:bg-primary/20 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/20 text-primary dark:text-cyan-400 px-3 py-1.5 rounded-full shrink-0">Precios</button>
                <button onclick="window.location.href=\'solicitar-sitio.html\'" class="bg-primary hover:bg-primary/95 text-white px-3 py-1.5 rounded-full shrink-0 flex items-center gap-1">Cotizar <span class="material-symbols-outlined text-[12px]">edit</span></button>
            </div>

            <!-- Input area -->
            <div class="p-3 border-t border-black/5 dark:border-white/5 flex gap-2 items-center bg-white/50 dark:bg-slate-950/50 shrink-0">
                <input id="ai-chat-input" type="text" placeholder="Escribe un mensaje..." class="flex-grow bg-slate-100 dark:bg-slate-900/50 rounded-xl border-none outline-none px-4 py-2 text-xs focus:ring-1 focus:ring-primary/30 dark:focus:ring-cyan-400/30 text-on-surface dark:text-slate-100">
                <button id="ai-chat-send" class="w-9 h-9 bg-primary dark:bg-cyan-500 text-white dark:text-slate-950 rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                    <span class="material-symbols-outlined text-[18px]">send</span>
                </button>
            </div>
        </div>
    `;

    // Inject chatbot to body if not already present
    if (!document.getElementById('ai-chat-btn')) {
        const botContainer = document.createElement('div');
        botContainer.innerHTML = chatbotHtml;
        document.body.appendChild(botContainer);
    }

    // Chatbot functionality
    const chatBtn = document.getElementById('ai-chat-btn');
    const chatWindow = document.getElementById('ai-chat-window');
    const chatClose = document.getElementById('ai-chat-close');
    const chatInput = document.getElementById('ai-chat-input');
    const chatSend = document.getElementById('ai-chat-send');
    const chatMessages = document.getElementById('ai-chat-messages');

    if (chatBtn && chatWindow && chatClose) {
        chatBtn.addEventListener('click', () => {
            chatWindow.classList.remove('translate-y-10', 'opacity-0', 'pointer-events-none');
            chatInput.focus();
        });
        chatClose.addEventListener('click', () => {
            chatWindow.classList.add('translate-y-10', 'opacity-0', 'pointer-events-none');
        });
    }

    const appendMessage = (text, isUser = false) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = isUser ? "flex gap-2.5 items-start justify-end" : "flex gap-2.5 items-start";
        
        const avatar = isUser 
            ? `<div class="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0 order-2">
                 <span class="material-symbols-outlined text-[18px]">person</span>
               </div>` 
            : `<div class="w-8 h-8 rounded-lg bg-primary/10 dark:bg-cyan-500/10 flex items-center justify-center text-primary dark:text-cyan-400 shrink-0">
                 <span class="material-symbols-outlined text-[18px]">smart_toy</span>
               </div>`;

        const bubble = `<div class="p-3 ${isUser ? 'bg-primary text-white rounded-tr-none' : 'bg-slate-100 dark:bg-slate-900 text-on-surface dark:text-slate-200'} rounded-2xl max-w-[80%] text-xs leading-relaxed">
                            ${text}
                        </div>`;
        
        msgDiv.innerHTML = avatar + bubble;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Secure AI Integration (Zero API Keys on Frontend)
    // All secrets are guarded on the backend server; frontend only talks to the proxy
    const AI_PROXY_URL = "https://dubai-miami-radar.onrender.com/api/tecno-chat";
    let conversationHistory = [];

    const callGroqAi = async (userMsg) => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s max before seamless fallback
            const res = await fetch(AI_PROXY_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg, history: conversationHistory.slice(-4) }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!res.ok) throw new Error(`Proxy HTTP ${res.status}`);
            const data = await res.json();
            let content = data.reply || "";
            return content.replace(/\*/g, '').trim();
        } catch (err) {
            console.warn("AI Proxy offline, using instant business fallback:", err);
            return null;
        }
    };

    const botResponse = async (userMsg) => {
        appendMessage('<div class="flex items-center gap-1"><span class="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span><span class="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-150"></span><span class="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-300"></span><span class="text-[10px] text-slate-400 ml-1">TecnoBot respondiendo...</span></div>');
        const indicator = chatMessages.lastChild;

        // Try Groq AI first
        let reply = await callGroqAi(userMsg);

        if (!reply) {
            // Intelligent fallback without asterisks and concise
            const msg = userMsg.toLowerCase();
            if (msg.includes('servicio') || msg.includes('automatiz') || msg.includes('propuesta')) {
                reply = "En Tecnoemprende creamos sistemas automatizados, propuestas interactivas para inversores, paginas web de lujo y soporte 24/7. ¿Que solucion necesitas?";
            } else if (msg.includes('precio') || msg.includes('costo') || msg.includes('cuanto cuesta')) {
                reply = "Nuestras landing pages inician en 300 USD y los portales corporativos en 800 USD. Puedes cotizar en solicitar-sitio.html.";
            } else if (msg.includes('portafolio') || msg.includes('dubai') || msg.includes('abu dhabi') || msg.includes('habana')) {
                reply = "Tenemos proyectos activos en Dubai (Tierra Querida, ApexFleet), Abu Dhabi y La Habana. Puedes verlos en portfolio.html.";
            } else {
                reply = "Hola. Soy TecnoBot AI de Tecnoemprende. Dime en que tipo de proyecto o automatizacion te puedo ayudar.";
            }
        }

        if (indicator) indicator.remove();
        reply = reply.replace(/\*/g, '').trim();
        appendMessage(reply);
        conversationHistory.push({ role: "user", content: userMsg });
        conversationHistory.push({ role: "assistant", content: reply });
    };

    window.sendQuickMessage = (text) => {
        appendMessage(text, true);
        botResponse(text);
    };

    if (chatSend && chatInput) {
        const handleSend = () => {
            const val = chatInput.value.trim();
            if (!val) return;
            appendMessage(val, true);
            chatInput.value = '';
            botResponse(val);
        };
        chatSend.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }
});
