/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import ExplodedSection from './components/ExplodedSection';
import CartOverlay from './components/CartOverlay';
import Footer from './components/Footer';
import CrummyMascot from './components/CrummyMascot';
import { useEffect, useState } from 'react';

import CustomGiftBox from './components/sections/CustomGiftBox';
import CardSalonSection from './components/sections/CardSalonSection';
import MoodPrescription from './components/sections/MoodPrescription';
import FAQ from './components/sections/FAQ';
import CommunitySection from './components/sections/CommunitySection';
import CakeCustomizerLab from './components/sections/CakeCustomizerLab';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: any) => {
    setCart(prev => {
      // If adding a giftbox with packed cakes, clear those cakes from other previous giftboxes in the cart
      if (product.id?.startsWith('giftbox-')) {
        const productPacks = product.packedItemNames || (product.packedItemName ? [product.packedItemName] : []);
        if (productPacks.length > 0) {
          return prev.map(item => {
            if (item.id?.startsWith('giftbox-')) {
              const currentPacks = item.packedItemNames || (item.packedItemName ? [item.packedItemName] : []);
              const filtered = currentPacks.filter((p: string) => !productPacks.includes(p));
              return {
                ...item,
                packedItemNames: filtered,
                packedItemName: filtered.length > 0 ? filtered.join('、') : undefined
              };
            }
            return item;
          }).concat(product);
        }
      }
      return [...prev, product];
    });
    setIsCartOpen(true);
    // Optional: show a small toast or notification
    console.log('Added to cart:', product);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        const id = anchor.hash.replace('#', '');
        
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          
          window.history.pushState(null, '', anchor.hash);
        }
        
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };

    window.addEventListener('click', handleGlobalClick, { capture: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [viewingProductId, setViewingProductId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedProductId || viewingProductId || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProductId, viewingProductId, isCartOpen]);

  return (
    <div className="relative min-h-screen selection:bg-berry selection:text-white">
      <ExplodedSection 
        productId={selectedProductId || viewingProductId} 
        viewOnly={!!viewingProductId}
        onClose={() => {
          setSelectedProductId(null);
          setViewingProductId(null);
        }}
        onAddToCart={addToCart}
      />
      <CartOverlay 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemoveItem={removeFromCart}
        onClearCart={() => setCart([])}
      />
      {/* Intro Overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0, pointerEvents: isLoading ? 'auto' : 'none' }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] bg-ink flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <div className="text-6xl mb-6">🍰</div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-cake tracking-tighter mb-4">
            Piece of Cake.
          </h1>
          <div className="w-12 h-[1px] bg-berry mx-auto" />
        </motion.div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-berry z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} />
      
      <main>
        <Hero />
        
        {/* Marquee Section */}
        <div className="bg-berry py-3 overflow-hidden whitespace-nowrap border-y border-ink/10">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-[10px] font-bold tracking-[0.5em] uppercase px-12 text-white">
                WE HEAL YOUR SOUL • PIECE OF CAKE • SWEET PRESCRIPTION • WE HEAL YOUR SOUL • PIECE OF CAKE
              </span>
            ))}
          </motion.div>
        </div>

        <ProductSection 
          onSelectProduct={setSelectedProductId} 
          onViewProduct={setViewingProductId}
          onAddToCart={addToCart}
        />

        {/* 🍰 Piece of Cake Customized Laboratory Section */}
        <CakeCustomizerLab onAddToCart={addToCart} />
        
        {/* Restored Sections */}
        <CustomGiftBox onAddToCart={addToCart} cartItems={cart} />

        {/* Dedicated Card Writing Salon */}
        <CardSalonSection onAddToCart={addToCart} />

        <MoodPrescription 
          onSelectProduct={setSelectedProductId} 
          onViewProduct={setViewingProductId}
          onAddToCart={addToCart}
        />

        <CommunitySection />

        <FAQ />
      </main>

      <Footer />
      <CrummyMascot />
    </div>
  );
}

