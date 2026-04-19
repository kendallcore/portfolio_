/**
 * Professional Portfolio Interactivity
 * Author: Mukesh
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Particles Canvas
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray = [];
        const numberOfParticles = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.fillStyle = 'rgba(14, 165, 233, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        function init() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();

                // Connect particles
                for (let j = i; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(14, 165, 233, ${1 - distance / 100})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        init();
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });
    }

    // 1. Preloader
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500); // Simulated loading time

    // 2. Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Slight delay for outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 150, fill: 'forwards' });
    });

    // Add hover effect to links and buttons
    const hoverElements = document.querySelectorAll('a, button, .project-card, .service-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });

    // 3. Theme Toggling
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 3.5 Language Toggling Mock
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        let currentLang = 'EN';
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'EN' ? 'FR' : 'EN';
            langToggle.textContent = currentLang;
            console.log(`Language changed to ${currentLang}`);
        });
    }

    // 4. Header Scroll Effect, Scroll Progress & Back to Top
    const header = document.querySelector('.header');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Progress Bar
        if (scrollProgress) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + '%';
        }

        // Back to Top Button Visibility
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Mobile Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // 6. Active Link Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 7. Typing Effect
    const typingText = document.getElementById('typing-text');
    const words = ['AI Developer', 'Software Engineer', 'Tech Enthusiast', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 100;
        if (isDeleting) typeSpeed /= 2;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // 8. Scroll Reveal Animation & Stats Counter & Skill Bars
    const revealElements = document.querySelectorAll('.reveal');
    const statsElements = document.querySelectorAll('.counter');
    let statsAnimated = false;

    function animateStats() {
        statsElements.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const count = +stat.innerText;
            const increment = target / 50; // Adjust speed

            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(animateStats, 30);
            } else {
                stat.innerText = target;
            }
        });
    }

    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');

                // Trigger stats counter if visible
                if (el.classList.contains('about-text') && !statsAnimated) {
                    animateStats();
                    statsAnimated = true;
                }

                // Trigger skill bars
                if (el.classList.contains('skills-category')) {
                    const progressBars = el.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                }
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Initial check

    // 9. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // Matches transition time
                }
            });
        });
    });

    // 9.5 3D Tilt Effect for Cards
    const tiltElements = document.querySelectorAll('[data-tilt]');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        });
    });

    // 10. Project Modal Logic
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close-modal');
    const modalOverlay = document.querySelector('.modal-overlay');

    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalCategory = document.getElementById('modal-category');
    const modalTech = document.getElementById('modal-tech');
    const modalLink = document.getElementById('modal-link');
    const modalImgPlaceholder = document.getElementById('modal-img-placeholder');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // Populate data
            modalTitle.textContent = card.getAttribute('data-title');
            modalDesc.textContent = card.getAttribute('data-desc');
            modalCategory.textContent = card.querySelector('.project-category').textContent;
            modalLink.href = card.getAttribute('data-link');

            // Get icon from card
            const iconHtml = card.querySelector('.img-placeholder').innerHTML;
            modalImgPlaceholder.innerHTML = iconHtml;

            // Generate tech tags
            const techs = card.getAttribute('data-tech').split(',');
            modalTech.innerHTML = '';
            techs.forEach(tech => {
                const span = document.createElement('span');
                span.classList.add('tech-tag');
                span.textContent = tech.trim();
                modalTech.appendChild(span);
            });

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // 11. Testimonials Carousel
    const slides = document.querySelectorAll('.testimonial-slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));

        // Auto advance
        setInterval(() => showSlide(currentSlide + 1), 5000);
    }

    // 12. Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.querySelector('.form-success');
    const submitBtn = document.querySelector('.submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            const inputs = contactForm.querySelectorAll('.form-control');

            inputs.forEach(input => {
                if (!input.value.trim() || (input.type === 'email' && !input.value.includes('@'))) {
                    input.parentElement.classList.add('error');
                    isValid = false;
                } else {
                    input.parentElement.classList.remove('error');
                }
            });

            if (isValid) {
                // Show loading state
                submitBtn.querySelector('.btn-text').style.opacity = '0';
                submitBtn.querySelector('.icon').style.opacity = '0';
                submitBtn.querySelector('.spinner').style.display = 'block';
                submitBtn.disabled = true;

                const formData = new FormData(contactForm);

                fetch(contactForm.action, {
                    method: 'POST',
                    body: formData
                })
                    .then(async (response) => {
                        if (response.ok) {
                            formSuccess.textContent = "Message sent successfully! I'll get back to you soon.";
                            formSuccess.style.display = 'block';
                            formSuccess.style.color = "var(--accent-secondary)";
                            formSuccess.style.borderColor = "rgba(16, 185, 129, 0.2)";
                            formSuccess.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
                            contactForm.reset();
                        } else {
                            const json = await response.json();
                            formSuccess.textContent = json.message || "Something went wrong. Please try again.";
                            formSuccess.style.display = 'block';
                            formSuccess.style.color = "#ef4444";
                            formSuccess.style.borderColor = "rgba(239, 68, 68, 0.2)";
                            formSuccess.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
                        }
                    })
                    .catch(error => {
                        formSuccess.textContent = "Something went wrong. Please check your internet connection.";
                        formSuccess.style.display = 'block';
                        formSuccess.style.color = "#ef4444";
                        formSuccess.style.borderColor = "rgba(239, 68, 68, 0.2)";
                        formSuccess.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
                    })
                    .finally(() => {
                        // Reset button state
                        submitBtn.querySelector('.btn-text').style.opacity = '1';
                        submitBtn.querySelector('.icon').style.opacity = '1';
                        submitBtn.querySelector('.spinner').style.display = 'none';
                        submitBtn.disabled = false;

                        setTimeout(() => {
                            formSuccess.style.display = 'none';
                        }, 5000);
                    });
            }
        });
    }

    // 13. AI Chatbot Logic
    const chatbot = document.getElementById('chatbot');
    const chatHeader = document.getElementById('chat-header');
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatBody = document.getElementById('chat-body');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');

    // Toggle Chatbot
    chatHeader.addEventListener('click', () => {
        chatbot.classList.toggle('collapsed');
        const icon = chatToggleBtn.querySelector('i');
        if (chatbot.classList.contains('collapsed')) {
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            // Scroll to bottom when opened
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    });

    // Mock AI Responses
    const botResponses = {
        'hi': "Hello there! I'm Mukesh's virtual assistant. How can I help you today?",
        'hello': "Hi! Looking to hire a great software engineer?",
        'skills': "Mukesh is highly skilled in Python, C++, React, and AI/ML. Check out the Skills section!",
        'projects': "He has built several amazing projects. Feel free to explore the Projects section.",
        'contact': "You can email him at mukesh1807r@gmail.com or use the contact form at the bottom of the page.",
        'default': "That's interesting! I'm still a simple bot, but Mukesh can answer that better. Please use the contact form to send him an email!"
    };

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-message', sender);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('msg-content');
        contentDiv.textContent = text;

        msgDiv.appendChild(contentDiv);
        chatBody.appendChild(msgDiv);

        // Auto scroll
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if (!msg) return;

        // User message
        addMessage(msg, 'user');
        chatInput.value = '';

        // Show typing indicator
        const typingId = 'typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.id = typingId;
        typingDiv.classList.add('chat-message', 'bot');
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatBody.appendChild(typingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        // Simulate typing delay
        setTimeout(() => {
            // Remove typing indicator
            const tDiv = document.getElementById(typingId);
            if (tDiv) tDiv.remove();

            const lowerMsg = msg.toLowerCase();
            let reply = botResponses['default'];

            for (const key in botResponses) {
                if (lowerMsg.includes(key)) {
                    reply = botResponses[key];
                    break;
                }
            }

            addMessage(reply, 'bot');
        }, 1500);
    });

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// ==========================================================================
//   Global Functions (accessible from HTML inline handlers)
// ==========================================================================

// ==========================================================================
//   Voice Assistant Logic (Speech Recognition & Synthesis)
// ==========================================================================

const voiceOverlay = document.getElementById('voice-overlay');
const voiceStatus = document.getElementById('voice-status');
const voiceTranscript = document.getElementById('voice-transcript');
const aiResponse = document.getElementById('ai-response');
const stopVoiceBtn = document.getElementById('stop-voice');

let recognition;
let isAssistantTalking = false;

// Initialize Speech Recognition if supported
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        voiceStatus.textContent = "Listening...";
        voiceOverlay.classList.remove('hidden');
    };

    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        if (finalTranscript) {
            voiceTranscript.textContent = finalTranscript;
            handleVoiceCommand(finalTranscript.toLowerCase());
        } else {
            voiceTranscript.textContent = interimTranscript;
        }
    };

    recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        voiceStatus.textContent = "Error: " + event.error;
    };

    recognition.onend = () => {
        if (!voiceOverlay.classList.contains('hidden') && !isAssistantTalking) {
            recognition.start(); // Keep listening unless closed or talking
        }
    };
}

function speak(text, callback) {
    if (!('speechSynthesis' in window)) return;

    // Stop recognition while talking to avoid feedback
    if (recognition) recognition.stop();
    isAssistantTalking = true;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;

    // Try to find a good female/assistant voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Female') || v.name.includes('Assistant')) || voices[0];
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => {
        isAssistantTalking = false;
        if (!voiceOverlay.classList.contains('hidden') && recognition) {
            try {
                recognition.start();
            } catch (e) {
                console.log("Recognition already started");
            }
        }
        if (callback) callback();
    };

    aiResponse.textContent = text;
    window.speechSynthesis.speak(utterance);
}

function handleVoiceCommand(command) {
    console.log("Command received:", command);

    if (command.includes('who are you') || command.includes('your name') || command.includes('who is mukesh')) {
        speak("Mukesh is an AI Developer and Software Engineer pursuing B.Tech at Saveetha Engineering College. He specializes in AI, machine learning, and full stack development.");
    } 
    else if (command.includes('project') && (command.includes('do') || command.includes('can you'))) {
        speak("Yes, I can certainly help with projects. Please contact my boss Mukesh for more details.");
    }
    else if (command.includes('show') && command.includes('project')) {
        speak("Sure, showing you Mukesh's projects now.", () => {
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            closeVoiceAssistant();
        });
    }
    else if (command.includes('contact') || command.includes('hire') || command.includes('email')) {
        speak("Navigating to the contact section so you can get in touch.", () => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            closeVoiceAssistant();
        });
    }
    else if (command.includes('skills')) {
        speak("Here are the technical skills Mukesh excels in.", () => {
            document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
            closeVoiceAssistant();
        });
    }
    else if (command.includes('experience') || command.includes('journey')) {
        speak("Let's look at Mukesh's professional journey.", () => {
            document.getElementById('experience').scrollIntoView({ behavior: 'smooth' });
            closeVoiceAssistant();
        });
    }
    else if (command.includes('about')) {
        speak("Scrolling to the about section for more details about Mukesh.", () => {
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
            closeVoiceAssistant();
        });
    }
    else if (command.includes('education') || command.includes('college') || command.includes('study')) {
        speak("Mukesh is studying at Saveetha Engineering College, focusing on Artificial Intelligence and Machine Learning.");
    }
    else if (command.includes('github') || command.includes('linkedin') || command.includes('social')) {
        speak("You can find Mukesh on GitHub and LinkedIn. The links are in the social section at the bottom of the page.");
    }
    else if (command.includes('resume') || command.includes('cv')) {
        speak("You can download Mukesh's resume from the about section.");
    }
    else if (command.includes('close') || command.includes('stop') || command.includes('exit')) {
        speak("Goodbye! Have a great day.", () => {
            closeVoiceAssistant();
        });
    }
    else {
        // More general questions
        if (command.includes('hello') || command.includes('hi')) {
            speak("Hello! I am Mukesh's assistant. How can I help you today?");
        } else if (command.includes('how are you')) {
            speak("I am doing great, thank you for asking! I'm ready to help you explore Mukesh's portfolio.");
        }
    }
}

function startVoice() {
    if (!recognition) {
        alert("Speech Recognition is not supported in your browser. Please try Chrome.");
        return;
    }

    voiceOverlay.classList.remove('hidden');
    voiceTranscript.textContent = "";
    aiResponse.textContent = "";
    
    // Initial greeting
    speak("Hi, I am Mukesh's assistant. You can ask me about his skills, projects, or even if I can do a project for you.");
}

function closeVoiceAssistant() {
    voiceOverlay.classList.add('hidden');
    if (recognition) recognition.stop();
    window.speechSynthesis.cancel();
    isAssistantTalking = false;
}

if (stopVoiceBtn) {
    stopVoiceBtn.addEventListener('click', closeVoiceAssistant);
}

