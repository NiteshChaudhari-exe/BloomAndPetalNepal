/**
 * Performance optimization utilities for image lazy loading and code splitting
 */

// Lazy load images with intersection observer
export const useLazyImage = (src: string, placeholder?: string) => {
  const [imageSrc, setImageSrc] = React.useState(placeholder || src);
  const [imageRef, setImageRef] = React.useState<HTMLImageElement | null>(null);

  React.useEffect(() => {
    if (!imageRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.unobserve(imageRef);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(imageRef);
    return () => observer.disconnect();
  }, [imageRef, src]);

  return { imageSrc, setImageRef };
};

// Debounce function for search and filtering
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return ((...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
};

// Memoized expensive computations
export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  return ((...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    return result;
  }) as T;
};

// Preload critical resources
export const preloadResource = (href: string, as: 'image' | 'script' | 'style' = 'image') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (as === 'image') {
    link.imagesrcset = href;
  }
  document.head.appendChild(link);
};

// Optimize bundle by lazy loading heavy modules
export const lazyLoadModule = async (modulePath: string) => {
  try {
    return await import(modulePath);
  } catch (error) {
    console.error(`Failed to load module: ${modulePath}`, error);
    return null;
  }
};

// Storage quota management
export const getStorageSize = () => {
  let size = 0;
  for (const [key, value] of Object.entries(localStorage)) {
    size += key.length + JSON.stringify(value).length;
  }
  return size;
};

export const optimizeStorage = () => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const currentSize = getStorageSize();
  
  if (currentSize > maxSize) {
    // Remove oldest entries or compress data
    const keys = Object.keys(localStorage);
    while (getStorageSize() > maxSize * 0.8 && keys.length > 0) {
      const key = keys.shift();
      if (key && !key.includes('user_') && !key.includes('cart')) {
        localStorage.removeItem(key);
      }
    }
  }
};

// Request idle callback polyfill for older browsers
export const requestIdleTask = (callback: () => void, options?: { timeout?: number }) => {
  if ('requestIdleCallback' in window) {
    return requestIdleCallback(callback, options);
  }
  return setTimeout(callback, 1);
};
