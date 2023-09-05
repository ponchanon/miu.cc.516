function handleClick() {
    alert('Button Clicked!');
}

const myButton = document.getElementById('sendMessageBtn');
myButton.addEventListener('click', handleClick);

// document.addEventListener('DOMContentLoaded', function() {
//     const sendMessageBtn = document.getElementById('sendMessageBtn');
//     const messageInput = document.getElementById('messageInput');
    
//     sendMessageBtn.addEventListener('click', function() {
//       const message = messageInput.value;
      
//       // Perform the action with the message
//       console.log('Sending message:', message);
      
//       // Clear the input field
//       messageInput.value = '';
//     });
//   });
  