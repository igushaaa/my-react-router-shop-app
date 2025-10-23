type ClientMiddleware = (args: any) => any;

// Логування навігації
export const navigationLogger: ClientMiddleware = ({ request, response, context }: any) => {
  console.log(`🚀 Navigation: ${request.method} ${request.url}`);
  
  if (response) {
    console.log(`✅ Response: ${response.status} ${response.statusText}`);
  }
  
  // Логуємо час завантаження
  const startTime = performance.now();
  
  return {
    request,
    response,
    context: {
      ...context,
      startTime,
    },
  };
};

// Метрики продуктивності
export const performanceMetrics: ClientMiddleware = ({ request, response, context }: any) => {
  if (context.startTime) {
    const endTime = performance.now();
    const loadTime = endTime - context.startTime;
    
    console.log(`⏱️ Load time: ${loadTime.toFixed(2)}ms`);
    
    // Відправляємо метрики на сервер (опціонально)
    if (loadTime > 1000) {
      console.warn(`🐌 Slow page load: ${loadTime.toFixed(2)}ms for ${request.url}`);
    }
  }
  
  return { request, response, context };
};

// Аналітика користувача
export const userAnalytics: ClientMiddleware = ({ request, response, context }: any) => {
  // Логуємо переходи між сторінками
  const pathname = new URL(request.url).pathname;
  
  // Відправляємо події аналітики (Google Analytics, Mixpanel, тощо)
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", "GA_MEASUREMENT_ID", {
      page_path: pathname,
    });
  }
  
  // Локальне зберігання статистики
  const analytics = JSON.parse(localStorage.getItem("analytics") || "{}");
  analytics[pathname] = (analytics[pathname] || 0) + 1;
  localStorage.setItem("analytics", JSON.stringify(analytics));
  
  return { request, response, context };
};

// Обробка помилок
export const errorHandler: ClientMiddleware = ({ request, response, context }: any) => {
  if (response && !response.ok) {
    console.error(`❌ Request failed: ${response.status} ${response.statusText}`);
    
    // Відправляємо помилки на сервер для моніторингу (виконується на клієнті)
    fetch("/api/errors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: request.url,
        status: response.status,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {
      // Ігноруємо помилки відправки помилок
    });
  }
  
  return { request, response, context };
};

// Комбінований middleware
export const clientMiddleware: ClientMiddleware = (args: any) => {
  let result = navigationLogger(args);
  result = performanceMetrics(result);
  result = userAnalytics(result);
  result = errorHandler(result);
  
  return result;
};
