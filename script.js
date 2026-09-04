document.querySelectorAll('.faq-item button').forEach(btn=>{
        btn.addEventListener('click',()=>{
          const item = btn.parentElement;
          const wasOpen = item.classList.contains('open');
          document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
          if(!wasOpen) item.classList.add('open');
        });
      });