import type {
  ApplicationConfig,
  VbenAdminProAppConfigRaw,
} from '@vben/types/global';

/**
 * 由 vite-inject-app-config 注入的全局配置
 */
export function useAppConfig(
  env: Record<string, any>,
  isProduction: boolean,
): ApplicationConfig {
  // 生产环境下，直接使用 window._VBEN_ADMIN_PRO_APP_CONF_ 全局变量
  const config = isProduction
    ? window._VBEN_ADMIN_PRO_APP_CONF_
    : (env as VbenAdminProAppConfigRaw);

  const {
    VITE_GLOB_API_URL,
    VITE_GLOB_AUTH_DINGDING_CORP_ID,
    VITE_GLOB_AUTH_DINGDING_CLIENT_ID,
    VITE_GLOB_APP_CLIENT_ID,
    VITE_GLOB_ENABLE_ENCRYPT,
    VITE_GLOB_RSA_PRIVATE_KEY,
    VITE_GLOB_RSA_PUBLIC_KEY,
    VITE_GLOB_SSE_ENABLE,
    VITE_GLOB_SSE_URL,
    VITE_GLOB_WEBSOCKET_ENABLE,
    VITE_GLOB_WEBSOCKET_URL,
  } = config;

  const applicationConfig: ApplicationConfig = {
    apiURL: VITE_GLOB_API_URL,
    auth: {},
    // 客户端key
    clientId: VITE_GLOB_APP_CLIENT_ID,
    // 是否开启加密
    enableEncrypt: VITE_GLOB_ENABLE_ENCRYPT === 'true',
    // RSA私钥
    rsaPrivateKey: VITE_GLOB_RSA_PRIVATE_KEY,
    // RSA公钥
    rsaPublicKey: VITE_GLOB_RSA_PUBLIC_KEY,
    // 是否开启sse
    sseEnable: VITE_GLOB_SSE_ENABLE === 'true',
    // sse地址
    sseUrl: VITE_GLOB_SSE_URL,
    // 是否开启websocket
    websocketEnable: VITE_GLOB_WEBSOCKET_ENABLE === 'true',
    // websocket地址
    websocketUrl: VITE_GLOB_WEBSOCKET_URL,
  };
  if (VITE_GLOB_AUTH_DINGDING_CORP_ID && VITE_GLOB_AUTH_DINGDING_CLIENT_ID) {
    applicationConfig.auth.dingding = {
      clientId: VITE_GLOB_AUTH_DINGDING_CLIENT_ID,
      corpId: VITE_GLOB_AUTH_DINGDING_CORP_ID,
    };
  }

  return applicationConfig;
}
