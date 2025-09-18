// 密钥对生成 http://web.chacuo.net/netrsakeypair
import JSEncrypt from 'jsencrypt';

class Encrypter {
  private rsaPrivateKey: null | string = null;
  private rsaPublicKey: null | string = null;

  /**
   * 解密
   * @param txt 需要解密的数据
   * @returns 解密后的数据
   */
  decrypt(txt: string) {
    if (!this.rsaPrivateKey || !this.rsaPublicKey) {
      throw new Error('加密器未初始化');
    }
    const instance = new JSEncrypt();
    instance.setPrivateKey(this.rsaPrivateKey);
    return instance.decrypt(txt);
  }

  /**
   * 加密
   * @param txt 需要加密的数据
   * @returns 加密后的数据
   */
  encrypt(txt: string) {
    if (!this.rsaPrivateKey || !this.rsaPublicKey) {
      throw new Error('加密器未初始化');
    }
    const instance = new JSEncrypt();
    instance.setPublicKey(this.rsaPublicKey);
    return instance.encrypt(txt);
  }

  /**
   * 设置密钥
   */
  setKeys(rsaPrivateKey: string, rsaPublicKey: string) {
    this.rsaPrivateKey = rsaPrivateKey;
    this.rsaPublicKey = rsaPublicKey;
  }
}

const encrypter = new Encrypter();

export { encrypter };
