// Função para rolar até o formulário
function scrollToForm() {
    const formSection = document.getElementById('form-section');
    if (formSection) {
        formSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
        
        // Destacar o formulário brevemente
        const formContainer = document.querySelector('.contact-news-style');
        if (formContainer) {
            formContainer.style.backgroundColor = '#fff3e0';
            setTimeout(() => {
                formContainer.style.backgroundColor = '';
            }, 2000);
        }
    }
}

// Contador regressivo simples
function startCountdown() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');

    // Define prazo para 7 dias a partir de agora
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = deadline.getTime() - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        } else {
            // Reinicia o contador quando chega a zero
            deadline.setDate(deadline.getDate() + 7);
        }
    }

    // Atualiza imediatamente e depois a cada minuto
    updateCountdown();
    setInterval(updateCountdown, 60000);
}

// Atualizar data do prazo
function updateDeadlineDate() {
    const deadlineElement = document.getElementById('deadline');
    if (deadlineElement) {
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 7);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        deadlineElement.textContent = deadline.toLocaleDateString('pt-BR', options);
    }
}

// Função para simular reprodução de vídeo
function playVideo() {
    alert('Este é um exemplo da página de notícias. Em uma implementação real, aqui seria reproduzido o vídeo explicativo do método.');
}

// Manipulação do formulário
function setupForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação simples
            if (!validateForm()) {
                return;
            }
            
            // Simular envio
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showSuccessMessage();
                form.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Validação simples do formulário
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const city = document.getElementById('city').value.trim();
    const terms = document.getElementById('terms').checked;
    
    let errors = [];
    
    if (name.length < 2) {
        errors.push('Por favor, digite seu nome completo');
    }
    
    if (!isValidEmail(email)) {
        errors.push('Por favor, digite um e-mail válido');
    }
    
    if (phone.length < 10) {
        errors.push('Por favor, digite um número de WhatsApp válido');
    }
    
    if (city.length < 2) {
        errors.push('Por favor, digite sua cidade');
    }
    
    if (!terms) {
        errors.push('É necessário autorizar o contato');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors);
        return false;
    }
    
    return true;
}

// Validar e-mail
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Mostrar mensagem de erro
function showErrorMessage(errors) {
    const errorHtml = errors.map(error => `• ${error}`).join('<br>');
    const message = `
        <div style="background: #ffebee; color: #c62828; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 2px solid #f44336; text-align: center;">
            <h4 style="margin-bottom: 10px;"><i class="fas fa-exclamation-triangle"></i> Atenção</h4>
            <div style="text-align: left;">${errorHtml}</div>
        </div>
    `;
    
    showMessage(message);
}

// Mostrar mensagem de sucesso
function showSuccessMessage() {
    const message = `
        <div style="background: #e8f5e8; color: #2e7d32; padding: 25px; border-radius: 8px; margin-bottom: 20px; border: 2px solid #4caf50; text-align: center;">
            <h4 style="margin-bottom: 15px;"><i class="fas fa-check-circle"></i> Solicitação Enviada!</h4>
            <p style="margin: 0; font-size: 16px;">Obrigado pelo seu interesse! Nossa equipe entrará em contato em até 2 horas para enviar todas as informações sobre o método.</p>
        </div>
    `;
    
    showMessage(message);
}

// Mostrar mensagem no formulário
function showMessage(messageHtml) {
    const formContainer = document.querySelector('.news-form');
    if (formContainer) {
        // Remove mensagem anterior se existir
        const existingMessage = formContainer.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Adiciona nova mensagem
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        messageDiv.innerHTML = messageHtml;
        
        formContainer.insertBefore(messageDiv, formContainer.firstChild);
        
        // Rola até a mensagem
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove mensagens de sucesso automaticamente após 8 segundos
        if (messageHtml.includes('Sucesso') || messageHtml.includes('Enviada')) {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 8000);
        }
    }
}

// Formatação automática do telefone
function setupPhoneFormatting() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length >= 11) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 7) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            }
            
            e.target.value = value;
        });
    }
}

// Validação em tempo real simples
function setupRealTimeValidation() {
    const inputs = document.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateSingleField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Validar campo individual
function validateSingleField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch (field.type) {
        case 'email':
            isValid = isValidEmail(value);
            errorMessage = 'E-mail inválido';
            break;
        case 'tel':
            isValid = value.length >= 10;
            errorMessage = 'Telefone muito curto';
            break;
        default:
            isValid = value.length >= 2;
            errorMessage = 'Campo obrigatório';
    }
    
    if (!isValid && value.length > 0) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
}

// Mostrar erro no campo
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#f44336';
    field.style.backgroundColor = '#ffebee';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = `
        color: #f44336;
        font-size: 14px;
        margin-top: 5px;
        font-weight: 600;
    `;
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

// Limpar erro do campo
function clearFieldError(field) {
    field.style.borderColor = '#ddd';
    field.style.backgroundColor = 'white';
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Efeito de destaque para elementos importantes
function addHighlightEffects() {
    // Destacar boxes importantes quando visíveis
    const importantBoxes = document.querySelectorAll('.important-box, .ad-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 2s ease-in-out';
            }
        });
    }, { threshold: 0.5 });
    
    importantBoxes.forEach(box => {
        observer.observe(box);
    });
}

// Adicionar animação CSS para pulse
function addPulseAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Inicializar tudo quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    updateDeadlineDate();
    setupForm();
    setupPhoneFormatting();
    setupRealTimeValidation();
    addHighlightEffects();
    addPulseAnimation();
    
    // Adicionar efeito de entrada suave para o artigo principal
    const mainNews = document.querySelector('.main-news');
    if (mainNews) {
        mainNews.style.opacity = '0';
        mainNews.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            mainNews.style.transition = 'opacity 1s ease, transform 1s ease';
            mainNews.style.opacity = '1';
            mainNews.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Função para melhorar a experiência em dispositivos móveis
function setupMobileEnhancements() {
    // Detectar se é dispositivo móvel
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Aumentar área de toque dos botões
        const buttons = document.querySelectorAll('button, .ad-button');
        buttons.forEach(button => {
            button.style.minHeight = '48px';
            button.style.padding = '15px 20px';
        });
        
        // Melhorar campos de formulário para mobile
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.style.fontSize = '16px'; // Evita zoom no iOS
            input.style.minHeight = '48px';
        });
    }
}

// Executar melhorias mobile quando a página carregar
window.addEventListener('load', setupMobileEnhancements);

// Reexecutar melhorias mobile quando a tela for redimensionada
window.addEventListener('resize', setupMobileEnhancements);
