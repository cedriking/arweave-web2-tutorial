/// <reference types="arconnect" />

export default class Account {
  address: string;

  constructor() {
    this.events();
  }

  async login() {
    await window.arweaveWallet.connect([
      'ACCESS_ADDRESS',
      'SIGN_TRANSACTION'
    ], {
      name: 'TODO List'
    });

    try {
      this.address = await window.arweaveWallet.getActiveAddress();
    } catch(e) {}

    this.showAddress();
  }

  async logout() {
    await window.arweaveWallet.disconnect();
    this.address = null;
    this.showAddress();
  }

  private showAddress() {
    if(this.address){
      document.getElementById('login').classList.add('hidden');
      for(const addy of document.getElementsByClassName('address')){
        addy.innerHTML = this.address;
        addy.parentElement.classList.remove('hidden');
      }
    } else {
      document.getElementById('login').classList.remove('hidden');
      for(const addy of document.getElementsByClassName('address')){
        addy.parentElement.classList.add('hidden');
      }
    }
  }

  private events() {
    window.addEventListener("arweaveWalletLoaded", async () => {
      try {
        this.address = await window.arweaveWallet.getActiveAddress();
      } catch(e) {}
      this.showAddress();
    });

    window.addEventListener("walletSwitch", (e) => {
      this.address = e.detail.address;
      this.showAddress();
    });
  }
}