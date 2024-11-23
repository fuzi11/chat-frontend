const socket = io('https://chat-backend-2lqbl1dqe-fuzi11s-projects.vercel.app/'); // Ganti URL backend jika sudah di-deploy

function chatApp() {
  return {
    username: '',
    message: '',
    messages: [],
    init() {
      socket.on('receiveMessage', (data) => {
        this.messages.push(data);
        this.$nextTick(() => {
          this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
        });
      });
    },
    sendMessage() {
      if (this.username.trim() && this.message.trim()) {
        const msg = { username: this.username, text: this.message };
        socket.emit('sendMessage', msg);
        this.message = '';
      }
    },
  };
}
