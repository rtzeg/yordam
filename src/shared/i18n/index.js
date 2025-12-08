// src/shared/i18n/index.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    ru: {
        translation: {
            common: {
                verified: "Проверен Yordam",
                specialist: "Специалист Yordam",
                matchesYourRequest: "Соответствует вашему запросу",
                yearsOld: "{{age}} лет",
                ageUnknown: "Возраст не указан",
                experience: "Опыт {{years}}",
                experienceUnknown: "Опыт не указан",
                pricePerHour: "{{price}} {{currency}}/час",
                priceUnknown: "Цена уточняется",
            },

            card: {
                more: "Подробнее",
            },

            listPage: {
                title: "Поиск специалиста",
                breadcrumbsRoot: "Главная страница",
                breadcrumbsList: "Выбор специалиста",
                searchPlaceholder: "Джон Дой, Нутрициолог, тревога...",
                foundPrefix: "Найдено",
                foundSuffix: "специалистов",
                sortPopular: "Самые просматриваемые",
                sortVerified: "Проверенные",
                sortNew: "Новички",
                filtersTitle: "Фильтры",
                filtersReset: "Сбросить",
                noResults:
                    "По вашему запросу пока ничего не найдено. Попробуйте изменить фильтры или запрос.",
                loadingList: "Загружаем список специалистов...",
                loadingFilters: "Загружаем фильтры...",
                loadMore: "Загрузить ещё",
            },

            detailPage: {
                title: "Страница специалиста",
                aboutTitle: "Обо мне",
                approachTitle: "Психологический подход к работе",
                educationTitle: "Образование",
                certificatesTitle: "Сертификаты",
                educationEmpty: "Информация об образовании будет добавлена позже.",
                certificatesEmpty:
                    "Информация о сертификатах будет добавлена позже.",
                aboutEmpty:
                    "Описание специалиста будет добавлено позже. Здесь можно рассказать о своём подходе, опыте и темах, с которыми вы работаете.",
                priceLabel: "Стоимость сессии",
                bookButton: "Забронировать время",
                addFavorite: "Добавить в избранное",
                inFavorite: "В избранном",
                notFound: "Специалист не найден.",
                backToList: "Вернуться к списку",
                loading: "Загружаем специалиста...",
            },

            favoritesPage: {
                title: "Избранные психологи",
                empty:
                    "У вас пока нет избранных специалистов. Добавьте психолога на странице поиска или профиля.",
                loading: "Загружаем ваших избранных специалистов...",
                notFound:
                    "Вы добавили специалистов в избранное, но они сейчас не найдены в списке. Возможно, их статус изменился.",
            },

            // ⬇⬇⬇ НОВОЕ: ХЕДЕР
            header: {
                nav: {
                    catalog: "Каталог специалистов",
                    companies: "Компаниям",
                    psychologists: "Психологам",
                    influencers: "Инфлюенсерам",
                    contacts: "Контакты",
                },
                auth: {
                    login: "Войти",
                    register: "Зарегистрироваться",
                },
                account: {
                    title: "Аккаунт",
                    personalQuestions: "Личные вопросы",
                    choosePsychologist: "Выбор психолога",
                    settings: "Настройки",
                    billing: "Оплата",
                    videochat: "Видеочат",
                    support: "Поддержка",
                    logout: "Выйти из аккаунта",
                },
                role: {
                    psychologist: "Психолог",
                    client: "Клиент сервиса",
                },
                favorites: {
                    title: "Избранные психологи",
                },
            },
            footer: {
                questionsTitleLine1: "У вас остались",
                questionsTitleLine2: "вопросы по сервису?",
                questionsText:
                    "Мы готовы предоставить вам проверенного специалиста, с которым вы можете обсудить все ваши вопросы.",
                chatWithYordam: "Чат с Yordam",
                telegramAria: "Написать в Telegram",
                whatsappAria: "Написать в WhatsApp",

                columnYordamTitle: "Yordam",
                specialists: "Специалисты",
                influencers: "Инфлюенсерам",
                partners: "Партнёрам",
                companies: "Компаниям",

                columnHelpTitle: "Помощь",
                contacts: "Контакты",
                techSupport: "Тех. поддержка",
                workAsPsychologist: "Работать психологом",
                privacyPolicy: "Политика приватности",

                newsletterTitle: "Рассылка новостей",
                newsletterPlaceholder: "Введите ваш email",
                newsletterButton: "Больше акций с рассылкой",

                copyright: "© Copyright 2025, Все права защищены Yordam",
            },
            companies: {
                badge: "Решения для бизнеса",
                title: "Корпоративный психолог для вашей компании",
                intro:
                    "Yordam помогает компаниям разных сфер — от IT до офлайн-центров — внедрять психологическую поддержку сотрудников. Это снижает выгорание, уменьшает текучку и повышает продуктивность команды.",

                blocks: {
                    serviceForCompanies: {
                        title: "Сервис под компании",
                        desc:
                            "Мы заточены под задачи бизнеса: гибкие форматы сессий, единая отчётность, персональный менеджер и удобный подбор специалистов под вашу отрасль.",
                    },
                    ownPsychologists: {
                        title: "Приведите своих психологов",
                        desc:
                            "Если у вас уже есть проверенные психологи, мы можем интегрировать их в платформу Yordam и дать вашей команде единое удобное пространство для записи и проведения сессий. Для компаний с собственным пулом специалистов действуют отдельные условия и скидки.",
                    },
                    discounts: {
                        title: "Скидки при объёме",
                        desc:
                            "Для компаний, которые берут от 12 и более сессий в месяц, мы предлагаем пониженные тарифы и специальные корпоративные пакеты: индивидуальные, командные и групповые встречи.",
                    },
                },

                formatsTitle: "Форматы корпоративного психолога",
                formatsIntro:
                    "Подбираем специалистов с опытом работы именно в вашей сфере и выстраиваем понятный формат: индивидуальные консультации, регулярные дни «корпоративного психолога», онлайн-поддержка для удалённых команд.",

                segments: {
                    it: {
                        title: "Психолог для IT-компании",
                        desc:
                            "Помогаем специалистам справляться с выгоранием, перегрузками и постоянными дедлайнами, поддерживая продуктивность и вовлечённость.",
                    },
                    office: {
                        title: "Психолог для офиса",
                        desc:
                            "Снижение конфликтов, поддержка здорового климата и помощь сотрудникам в сложных личных ситуациях.",
                    },
                    education: {
                        title: "Психолог для центра / учебного заведения",
                        desc:
                            "Поддержка преподавателей, студентов и сотрудников, работа с эмоциональной нагрузкой и стрессом.",
                    },
                    esports: {
                        title: "Психолог для киберспорта",
                        desc:
                            "Подготовка к турнирам, работа с волнением, концентрацией и командной динамикой.",
                    },
                    productivity: {
                        title: "Психолог для продуктивности",
                        desc:
                            "Индивидуальные и групповые сессии, направленные на улучшение фокуса, планирования и эффективности работы.",
                    },
                    custom: {
                        title: "Индивидуальные решения",
                        desc:
                            "Поможем подобрать формат под специфику вашей компании и текущие задачи HR / руководства.",
                    },
                },

                form: {
                    title: "Оставьте заявку на корпоративное сотрудничество",
                    subtitle:
                        "Расскажите коротко о компании и запросе — мы подготовим предложение и свяжемся с вами.",
                    companyNameLabel: "Название компании",
                    companyNamePlaceholder:
                        "ООО «Пример», IT-компания, сеть центров и т.д.",
                    contactPersonLabel: "Контактное лицо",
                    contactPersonPlaceholder:
                        "Имя, роль (HR, руководитель и т.д.)",
                    contactLabel: "Контакт для связи",
                    contactPlaceholder: "E-mail или телефон / Telegram",
                    sessionsLabel: "Ориентировочное количество сессий в месяц",
                    sessionsPlaceholder:
                        "Например: 12–20 индивидуальных + 2 групповые",
                    requestLabel: "Запрос компании",
                    requestPlaceholder:
                        "Кратко опишите задачи: поддержка команды, снижение выгорания, формат «коллективный психолог» и т.п.",
                    submit: "Отправить заявку",
                },

                aside: {
                    title: "Коллективный психолог для команды",
                    text:
                        "Мы помогаем компаниям выстраивать системную поддержку: регулярные приёмы для сотрудников, дни открытых консультаций, анонимные обращения и сопровождение HR-команды.",
                    note:
                        "Для крупных компаний и объёмов от 12 сессий в месяц действуют специальные корпоративные тарифы. Детали вы получите после обработки заявки.",
                },
            },
            psyPage: {
                hero: {
                    badge: "удалённая работа для психологов",
                    titleLine1: "Платформа для",
                    titleLine2: "практикующих психологов",
                    text:
                        "Мы берём на себя клиента, организацию и технологии, а вы занимаетесь тем, что умеете лучше всего: поддержкой людей. Прозрачные условия, удобный онлайн-сервис и команда, с которой можно советоваться.",
                    imageAlt: "Психолог с чашкой кофе",
                },
                cta: {
                    button: "Начать сотрудничество",
                },
                stats: {
                    psychologists: {
                        label: "Психологов в команде",
                        note: "присоединились к платформе",
                    },
                    retention: {
                        label: "Удержание специалистов",
                        note: "остаются с нами дольше года",
                    },
                    match: {
                        label: "Клиенты находят «своего»",
                        note: "по отзывам и повторным сессиям",
                    },
                    sessions: {
                        label: "Проведённых сессий",
                        note: "на нашей платформе",
                    },
                    since: {
                        value: "с 2025 года",
                        label: "Мы в рынке",
                        note: "развиваем доступную психологическую помощь",
                    },
                },
                accordion: {
                    title: "Вы занимаетесь психотерапией, мы — организацией",
                    subtitle:
                        "Помогаем выстроить стабильный поток клиентов и рабочий режим, в котором не приходится выбирать между доходом и своим ресурсом.",
                    items: {
                        traffic: {
                            title:
                                "Не думаете о том, где брать клиентов — мы приводим трафик",
                            text:
                                "Мы берём на себя маркетинг и поток заявок: платформа помогает клиентам находить именно вас по запросу, опыту и специализации.",
                        },
                        operations: {
                            title:
                                "Берём на себя организацию и технику: записи, напоминания, оплата",
                            text:
                                "Система записей, напоминаний и онлайн-оплаты работает через Yordam. Вам не нужно держать всё в голове и в блокнотах.",
                        },
                        format: {
                            title:
                                "Консультируете из любой точки мира в удобном формате",
                            text:
                                "Вы сами выбираете формат: видео, аудио или чат. Главное — стабильный интернет и комфортный вам график.",
                        },
                        brand: {
                            title:
                                "Помогаем развивать личный бренд и профиль специалиста",
                            text:
                                "Помогаем оформить профиль, собрать отзывы и аккуратно развивать ваш профессиональный бренд без агрессивного маркетинга.",
                        },
                        schedule: {
                            title:
                                "Работаете в те дни и часы, которые подходят именно вам",
                            text:
                                "Вы сами задаёте расписание и количество сессий. Платформа подстраивается под ваш ресурс, а не наоборот.",
                        },
                        support: {
                            title:
                                "Поддерживаем, чтобы вы меньше выгорали и не оставались одни с нагрузкой",
                            text:
                                "Команда сопровождения и коллеги по платформе — это пространство, где можно обсудить рабочие сложности и не тащить всё в одиночку.",
                        },
                    },
                },
                calculator: {
                    title: "Сколько вы можете зарабатывать с Yordam",
                    subtitle:
                        "Примерный расчёт. Реальный доход зависит от количества проведённых сессий и выбранного тарифа.",
                    sessionsPerDay: "Сессий в день",
                    daysPerWeek: "Дней в неделю",
                    sessionsLabel: "{{count}} сессий",
                    daysLabel: "{{count}} дн. в неделю",
                    notePrefix: "В расчёте использована ориентировочная стоимость",
                    noteSuffix:
                        "за сессию. Точные цифры зависят от формата работы и выбранного тарифа.",
                    incomeLabel: "Примерный доход",
                    perMonth: "в месяц",
                    perYear: "в год",
                    footer:
                        "Это ориентировочные значения при выбранной нагрузке. Мы помогаем удерживать стабильный поток клиентов, чтобы вы могли планировать доход и отдых.",
                },
                requirements: {
                    title: "Требования к специалистам",
                    subtitle:
                        "Мы работаем с практикующими психологами, которые разделяют наши ценности, бережно относятся к клиентам и готовы развиваться в онлайн-формате.",
                    items: {
                        education: {
                            title: "Образование",
                            text:
                                "Высшее психологическое образование (бакалавриат, магистратура, специалитет) или диплом о профессиональной переподготовке по психологии.",
                        },
                        extraEducation: {
                            title: "Дополнительное обучение",
                            text:
                                "Завершённая программа обучения одному из психологических подходов (например, КПТ, гештальт-терапия, психоанализ и др.).",
                        },
                        experience: {
                            title: "Практический опыт",
                            text:
                                "Опыт проведения психологических консультаций от 2 лет: онлайн или офлайн, в частной практике или в организации.",
                        },
                        tech: {
                            title: "Технические требования",
                            text:
                                "Компьютер или телефон с рабочей камерой и микрофоном, стабильный интернет для проведения онлайн-сессий.",
                        },
                        ethics: {
                            title: "Этические нормы",
                            text:
                                "Строгое соблюдение профессиональной этики, конфиденциальности и уважительного отношения к каждому клиенту.",
                        },
                        legal: {
                            title: "Юридический статус",
                            text:
                                "Наличие статуса индивидуального предпринимателя или юридического лица в Республике Узбекистан либо готовность его оформить.",
                        },
                    },
                },
            },
            influencersPage: {
                hero: {
                    badge: "Партнёрство с Yordam",
                    title: "Инфлюенсерам и авторам контента",
                    text:
                        "Если у вас есть аудитория и вы разделяете ценность психологической помощи, " +
                        "мы готовы обсудить партнёрство: спецпроекты, интеграции, промокоды для вашей аудитории и многое другое."
                },
                blocks: {
                    why: {
                        title: "Зачем это вам",
                        text:
                            "• Дополнительный доход через партнёрскую программу.\n" +
                            "• Ценный и полезный оффер для аудитории.\n" +
                            "• Совместные проекты, эфиры и спецконтент."
                    },
                    formats: {
                        title: "Форматы сотрудничества",
                        text:
                            "• Интеграции в видео, сторис и посты.\n" +
                            "• Персональные промокоды.\n" +
                            "• Марафоны, челленджи, спецпроекты."
                    },
                    who: {
                        title: "Кому подходит",
                        text:
                            "• Блогерам и лидерам мнений.\n" +
                            "• Авторам в темах психологии, саморазвития, спорта, обучения, лайфстайла.\n" +
                            "• Тем, кто ценит ментальное здоровье."
                    }
                },
                form: {
                    title: "Оставьте заявку на сотрудничество",
                    subtitle:
                        "Расскажите о себе и своей аудитории — мы свяжемся с вами и предложим формат работы.",
                    fields: {
                        name: {
                            label: "Как к вам обращаться",
                            placeholder: "Имя или псевдоним"
                        },
                        contact: {
                            label: "Контакт для связи",
                            placeholder: "E-mail, Telegram или Instagram"
                        },
                        platform: {
                            label: "Площадка",
                            placeholder: "YouTube, Instagram, TikTok и т.д."
                        },
                        audienceSize: {
                            label: "Примерный размер аудитории",
                            placeholder: "Например: 50 000 подписчиков"
                        },
                        idea: {
                            label: "Идея или формат сотрудничества",
                            placeholder: "Опишите ваши ожидания и формат интеграции."
                        }
                    },
                    submit: "Отправить заявку"
                },
                support: {
                    title: "Поддержать развитие сервиса",
                    text:
                        "Если вам близка идея заботы о ментальном здоровье, вы можете поддержать развитие Yordam. " +
                        "Ваша помощь помогает нам развивать платформу и создавать новые форматы поддержки.",
                    imageAlt: "Тёплая поддерживающая иллюстрация",
                    button: "Поддержать сервис",
                    footerText:
                        "По вопросам партнёрства можно написать на " +
                        "partner@yordam.uz или в Telegram."
                },
                bottomNote:
                    "Мы аккуратно подбираем партнёров и форматы интеграций. " +
                    "Важнее всего — сохранить доверие пользователей и качество сервиса."
            },
            contactsPage: {
                hero: {
                    badge: "Контакты сервиса",
                    title: "Как связаться с Yordam",
                    text:
                        "Если у вас есть вопросы по работе сервиса, сотрудничеству или записи к психологу — выберите удобный способ связи. Мы стараемся отвечать как можно быстрее."
                },
                main: {
                    title: "Основные контакты",
                    phone: {
                        label: "Телефон",
                        number: "+998 90 000 00 00",
                        note: "По вопросам сервиса и записи к специалистам"
                    },
                    support: {
                        label: "Поддержка",
                        note: "Технические вопросы, доступ к кабинету, оплата"
                    },
                    partners: {
                        label: "Для партнёров",
                        note: "Компании, инфлюенсеры, HR, образовательные проекты"
                    },
                    messengers: {
                        label: "Мессенджеры",
                        note:
                            "Пишите в удобный мессенджер, обычно отвечаем в течение дня"
                    }
                },
                sideCard: {
                    title: "Мы всегда на связи",
                    text:
                        "Если вы не уверены, куда писать, просто выберите любой контакт выше — мы подскажем, к кому лучше обратиться.",
                    imageAlt: "Иллюстрация раздела контактов",
                    bottomNote:
                        "Пожалуйста, не отправляйте в поддержку экстренные запросы, требующие немедленного вмешательства врача или служб спасения."
                },
                map: {
                    title: "Мы на карте",
                    subtitle: "Самарканд, условный адрес офиса или точки присутствия сервиса."
                }
            },
            landing: {
                hero: {
                    titleMain: "Психологическая помощь,",
                    titleAccent: "онлайн",
                    subtitle:
                        "Онлайн-консультации с проверенными специалистами. Просто. Удобно. Надёжно.",
                    button: "Найти психолога",
                    priceLabel: "от 200 000 сум"
                },
                help: {
                    titleMain: "Чем мы вам",
                    titleAccent: "поможем",
                    text:
                        "Психологи Yordam помогают справляться с тревогой, отношениями, кризисами и сложными жизненными ситуациями. " +
                        "Ниже — лишь часть запросов, с которыми можно прийти.",
                    cards: {
                        anxiety: {
                            title: "Снизить тревожность и стресс",
                            text:
                                "Вместе с психологом вы научитесь лучше понимать свои эмоции, справляться с паникой, напряжением " +
                                "и постоянным чувством тревоги."
                        },
                        kids: {
                            title: "Поддержать ребёнка или подростка",
                            text:
                                "Специалисты помогают детям и подросткам справляться со страхами, давлением, буллингом, сменой школы " +
                                "и другими важными для них переживаниями."
                        },
                        relationships: {
                            title: "Улучшить отношения с партнёром или семьёй",
                            text:
                                "Можно разобрать конфликты, научиться говорить о чувствах, выстраивать границы и слышать друг друга " +
                                "без постоянных ссор."
                        },
                        loss: {
                            title: "Пережить расставание или утрату",
                            text:
                                "Психолог аккуратно поддержит в период потери, поможет прожить сильные чувства, снизить чувство вины " +
                                "и постепенно собирать жизнь заново."
                        }
                    }
                },
                howItWorks: {
                    title: "Как это работает",
                    subtitle:
                        "Начните свой путь к гармонии всего в несколько простых шагов. " +
                        "Мы сделали процесс максимально понятным и удобным.",
                    steps: {
                        step1: {
                            title: "Заполните анкету",
                            text:
                                "Ответьте на несколько вопросов о себе, чтобы мы могли быстрее подобрать подходящего психолога."
                        },
                        step2: {
                            title: "Выберите психолога",
                            text:
                                "Мы покажем подходящих специалистов. Вы выбираете того, с кем хотите начать."
                        },
                        step3: {
                            title: "Бронируйте дату",
                            text:
                                "Выберите удобное время и формат сессии. Всё онлайн, психолог всегда рядом."
                        },
                        step4: {
                            title: "Начните сессию",
                            text:
                                "Проведите первую сессию, чтобы познакомиться с психологом и понять, комфортно ли вам продолжать работу."
                        }
                    },
                    cta: "Попробовать сейчас"
                },
                verified: {
                    title: "Только проверенные и отобранные специалисты",
                    text:
                        "На платформу попадают только специалисты с профильным образованием и проверенным опытом. " +
                        "Мы вручную отбираем психологов и следим за качеством работы.",
                    button: "Найти психолога"
                }
            },
            psychologistsList: {
                title: "Поиск специалиста",
                breadcrumbs: {
                    home: "Главная страница",
                    current: "Выбор специалиста",
                },
                search: {
                    placeholder: "Имя, направление, запрос…",
                },
                found: {
                    prefix: "Найдено",
                    suffix: "специалистов",
                },
                sort: {
                    popular: "Самые просматриваемые",
                    verified: "Проверенные",
                    new: "Новички",
                },
                filters: {
                    title: "Фильтры",
                    reset: "Сбросить",
                    common: {
                        any: "Любой",
                    },
                    therapyType: {
                        label: "Вид терапии",
                    },
                    approach: {
                        label: "Психологический подход",
                    },
                    experience: {
                        label: "Опыт практики",
                        from1: "От 1 года",
                        from3: "От 3 лет",
                        from5: "От 5 лет",
                    },
                    time: {
                        label: "Удобное время сессии",
                        anyTime: "Любое",
                    },
                    language: {
                        label: "Язык консультирования",
                    },
                },
                messages: {
                    loadingFilters: "Загружаем фильтры…",
                    loadingList: "Загружаем список специалистов…",
                    empty:
                        "По вашему запросу пока ничего не найдено. Попробуйте изменить фильтры или запрос.",
                    loadError: "Ошибка загрузки данных",
                    errorPrefix: "Ошибка:",
                },
                loadMore: "Загрузить ещё",
            },
            psychDetail: {
                loading: "Загружаем специалиста...",
                notFound: {
                  text: "Специалист не найден.",
                  backLink: "Вернуться к списку",
                },
                error: {
                  prefix: "Ошибка:",
                  backLink: "Вернуться к списку",
                },
                breadcrumbs: {
                  home: "Главная страница",
                  list: "Выбор специалиста",
                },
                title: "Страница специалиста",
                buttons: {
                  book: "Забронировать время",
                  favoriteAdd: "Добавить в избранное",
                  favoriteIn: "В избранном",
                },
                header: {
                  verified: "Проверен Yordam",
                  notVerified: "Специалист Yordam",
                  age: "{{age}} лет",
                  ageNotSpecified: "Возраст не указан",
                  experience: "Опыт {{years}} лет",
                  experienceNotSpecified: "Опыт не указан",
                  pricePerHour: "{{price}} {{currency}}/час",
                  priceTBD: "Цена уточняется",
                  priceNote: "Стоимость сессии",
                },
                about: {
                  title: "Обо мне",
                  fallback:
                    "Описание специалиста будет добавлено позже. Здесь можно рассказать о своём подходе, опыте и темах, с которыми вы работаете.",
                },
                approach: {
                  title: "Психологический подход к работе",
                },
                education: {
                  title: "Образование",
                  empty: "Информация об образовании будет добавлена позже.",
                  documentLink: "Ссылка на документ →",
                },
                certificates: {
                  title: "Сертификаты",
                  empty: "Информация о сертификатах будет добавлена позже.",
                  issued: "Выдан: {{date}}",
                  validUntil: "Действителен до: {{date}}",
                  documentLink: "Ссылка на документ →",
                },
                reviews: {
                  title: "Отзывы",
                  items: {
                    r1: {
                      text:
                        "Сервис помог найти своего специалиста. Сайт удобный, записаться на сессию пару кликов.",
                      role: "Клиент сервиса Yordam",
                    },
                    r2: {
                      text:
                        "Не верилось, что онлайн-терапия зайдёт. Но с вашим психологом получилось выстроить доверие.",
                      role: "Клиентка сервиса Yordam",
                    },
                    r3: {
                      text:
                        "Нравится, что напоминания о сессиях приходят вовремя, а оплату и документы удобно хранить в одном месте.",
                      role: "Клиент сервиса Yordam",
                    },
                    r4: {
                      text:
                        "Нашла специалиста, который понимает именно мой запрос. Формат и интерфейс очень комфортные.",
                      role: "Клиентка сервиса Yordam",
                    },
                  },
                },
              }
              


        },
    },

    uz: {
        translation: {
            common: {
                verified: "Yordam tomonidan tasdiqlangan",
                specialist: "Yordam mutaxassisi",
                matchesYourRequest: "Sizning so‘rovingizga mos keladi",
                yearsOld: "{{age}} yosh",
                ageUnknown: "Yoshi ko‘rsatilmagan",
                experience: "Tajriba {{years}}",
                experienceUnknown: "Tajriba ko‘rsatilmagan",
                pricePerHour: "{{price}} {{currency}}/soat",
                priceUnknown: "Narxi kelishiladi",
            },

            card: {
                more: "Batafsil",
            },

            listPage: {
                title: "Mutaxassis qidirish",
                breadcrumbsRoot: "Bosh sahifa",
                breadcrumbsList: "Mutaxassis tanlash",
                searchPlaceholder: "Jon Do, dietolog, xavotir...",
                foundPrefix: "Topildi",
                foundSuffix: "nafar mutaxassis",
                sortPopular: "Eng ko‘p ko‘rilgan",
                sortVerified: "Tasdiqlangan",
                sortNew: "Yangi mutaxassislar",
                filtersTitle: "Filtrlar",
                filtersReset: "Tozalash",
                noResults:
                    "Sizning so‘rovingiz bo‘yicha hech narsa topilmadi. Filtrlarni yoki matnni o‘zgartirib ko‘ring.",
                loadingList: "Mutaxassislar ro‘yxati yuklanmoqda...",
                loadingFilters: "Filtrlar yuklanmoqda...",
                loadMore: "Yana ko‘rsatish",
            },

            detailPage: {
                title: "Mutaxassis sahifasi",
                aboutTitle: "Men haqimda",
                approachTitle: "Ishlash yondashuvi",
                educationTitle: "Ta’lim",
                certificatesTitle: "Sertifikatlar",
                educationEmpty:
                    "Ta’lim haqidagi ma’lumotlar keyinroq qo‘shiladi.",
                certificatesEmpty:
                    "Sertifikatlar haqidagi ma’lumotlar keyinroq qo‘shiladi.",
                aboutEmpty:
                    "Tavsif keyinroq qo‘shiladi. Bu yerda mutaxassis o‘z yondashuvi, tajribasi va ishlaydigan mavzulari haqida yozishi mumkin.",
                priceLabel: "Sessiya narxi",
                bookButton: "Vaqt bron qilish",
                addFavorite: "Sevimlilarga qo‘shish",
                inFavorite: "Sevimlilarda",
                notFound: "Mutaxassis topilmadi.",
                backToList: "Ro‘yxatga qaytish",
                loading: "Mutaxassis yuklanmoqda...",
            },

            favoritesPage: {
                title: "Sevimli psixologlar",
                empty:
                    "Hozircha sevimli mutaxassislaringiz yo‘q. Qidiruv yoki profil sahifasida psixolog qo‘shishingiz mumkin.",
                loading: "Sevimli mutaxassislaringiz yuklanmoqda...",
                notFound:
                    "Sevimlilarga qo‘shilgan mutaxassislar ro‘yxatda topilmadi. Ularning statusi o‘zgargan bo‘lishi mumkin.",
            },

            // ⬇⬇⬇ ХЕДЕР НА УЗБЕКСКОМ
            header: {
                nav: {
                    catalog: "Mutaxassislar katalogi",
                    companies: "Kompaniyalar uchun",
                    psychologists: "Psixologlar uchun",
                    influencers: "Influensyerlar uchun",
                    contacts: "Kontaktlar",
                },
                auth: {
                    login: "Kirish",
                    register: "Ro‘yxatdan o‘tish",
                },
                account: {
                    title: "Akkaunt",
                    personalQuestions: "Shaxsiy savollar",
                    choosePsychologist: "Psixolog tanlash",
                    settings: "Sozlamalar",
                    billing: "To‘lovlar",
                    videochat: "Videochat",
                    support: "Qo‘llab-quvvatlash",
                    logout: "Akkauntdan chiqish",
                },
                role: {
                    psychologist: "Psixolog",
                    client: "Servis mijozı",
                },
                favorites: {
                    title: "Sevimli psixologlar",
                },
            },
            footer: {
                questionsTitleLine1: "Xizmat haqida",
                questionsTitleLine2: "savollaringiz qoldimi?",
                questionsText:
                    "Biz sizga barcha savollaringizni muhokama qilishingiz mumkin bo‘lgan ishonchli mutaxassisni taklif qilishga tayyormiz.",
                chatWithYordam: "Yordam bilan chat",
                telegramAria: "Telegram orqali yozish",
                whatsappAria: "WhatsApp orqali yozish",

                columnYordamTitle: "Yordam",
                specialists: "Mutaxassislar",
                influencers: "Influensyerlar uchun",
                partners: "Hamkorlar",
                companies: "Kompaniyalar uchun",

                columnHelpTitle: "Yordam",
                contacts: "Kontaktlar",
                techSupport: "Tex. qo‘llab-quvvatlash",
                workAsPsychologist: "Psixolog sifatida ishlash",
                privacyPolicy: "Maxfiylik siyosati",

                newsletterTitle: "Yangiliklar xabarnomasi",
                newsletterPlaceholder: "Email manzilingizni kiriting",
                newsletterButton: "Chegirmalar va yangiliklarni olish",

                copyright: "© 2025, Barcha huquqlar Yordam tomonidan himoyalangan",
            },
            companies: {
                badge: "Biznes uchun yechimlar",
                title: "Kompaniyangiz uchun korporativ psixolog",
                intro:
                    "Yordam IT sohasidan tortib oflayn markazlargacha bo‘lgan turli kompaniyalarga xodimlar uchun psixologik yordam joriy etishda yordam beradi. Bu charchashni kamaytiradi, kadrlar almashinuvini pasaytiradi va jamoa samaradorligini oshiradi.",

                blocks: {
                    serviceForCompanies: {
                        title: "Biznes uchun moslashtirilgan servis",
                        desc:
                            "Biznes vazifalariga moslashganmiz: moslashuvchan sessiya formatlari, yagona hisobot, shaxsiy menejer va sohangizga mos mutaxassislarni tanlash imkoniyati.",
                    },
                    ownPsychologists: {
                        title: "O‘z psixologlaringiz bilan ishlash",
                        desc:
                            "Agar sizda allaqachon ishonchli psixologlar bo‘lsa, ularni Yordam platformasiga ulashimiz va jamoangiz uchun yozilish va sessiyalarni o‘tkazishning yagona qulay maydonini yaratishimiz mumkin. O‘z mutaxassislari bo‘lgan kompaniyalar uchun alohida shartlar va chegirmalar mavjud.",
                    },
                    discounts: {
                        title: "Katta hajm uchun chegirmalar",
                        desc:
                            "Oyiga 12 ta va undan ortiq sessiyalarni rejalashtirgan kompaniyalar uchun biz pasaytirilgan tariflar va maxsus korporativ paketlarni taklif qilamiz: individual, jamoaviy va guruh uchrashuvlari.",
                    },
                },

                formatsTitle: "Korporativ psixolog formatlari",
                formatsIntro:
                    "Sizning sohangizda tajribaga ega mutaxassislarni tanlaymiz va aniq formatni tuzamiz: individual konsultatsiyalar, «korporativ psixolog» kunlari, masofaviy jamoalar uchun onlayn qo‘llab-quvvatlash.",

                segments: {
                    it: {
                        title: "IT-kompaniya uchun psixolog",
                        desc:
                            "Mutaxassislarga charchash, ortiqcha yuklama va doimiy dedlaynlar bilan kurashishda yordam beramiz, samaradorlik va motivatsiyani qo‘llab-quvvatlaymiz.",
                    },
                    office: {
                        title: "Ofis uchun psixolog",
                        desc:
                            "Nizolarni kamaytirish, sog‘lom muhitni qo‘llab-quvvatlash va xodimlarga murakkab shaxsiy vaziyatlarda yordam ko‘rsatish.",
                    },
                    education: {
                        title: "Markaz / o‘quv muassasasi uchun psixolog",
                        desc:
                            "O‘qituvchilar, talabalar va xodimlarni qo‘llab-quvvatlash, hissiy yuklama va stress bilan ishlash.",
                    },
                    esports: {
                        title: "Kibersport uchun psixolog",
                        desc:
                            "Musobaqalarga tayyorgarlik, hayajon, diqqat va jamoaviy dinamikani boshqarish.",
                    },
                    productivity: {
                        title: "Samaradorlik uchun psixolog",
                        desc:
                            "Diqqat, rejalashtirish va ish samaradorligini oshirishga qaratilgan individual va guruh sessiyalari.",
                    },
                    custom: {
                        title: "Individual yechimlar",
                        desc:
                            "Kompaniyangiz xususiyati va HR / rahbariyat vazifalariga mos formatni tanlashda yordam beramiz.",
                    },
                },

                form: {
                    title: "Korporativ hamkorlik uchun ariza qoldiring",
                    subtitle:
                        "Kompaniya va so‘rov haqida qisqacha yozing — biz taklif tayyorlab, siz bilan bog‘lanamiz.",
                    companyNameLabel: "Kompaniya nomi",
                    companyNamePlaceholder:
                        "Masalan: «Misol» MCHJ, IT-kompaniya, markazlar tarmog‘i va h.k.",
                    contactPersonLabel: "Bog‘lanish uchun shaxs",
                    contactPersonPlaceholder:
                        "Ism, roli (HR, rahbar va hokazo)",
                    contactLabel: "Aloqa uchun ma’lumot",
                    contactPlaceholder: "Email yoki telefon / Telegram",
                    sessionsLabel: "Oyiga taxminiy sessiyalar soni",
                    sessionsPlaceholder:
                        "Masalan: 12–20 individual + 2 ta guruh sessiyasi",
                    requestLabel: "Kompaniya so‘rovi",
                    requestPlaceholder:
                        "Vazifalarni qisqacha yozing: jamoani qo‘llab-quvvatlash, charchashni kamaytirish, «korporativ psixolog» formati va hokazo.",
                    submit: "Arizani yuborish",
                },

                aside: {
                    title: "Jamoa uchun korporativ psixolog",
                    text:
                        "Biz kompaniyalarga tizimli qo‘llab-quvvatlashni yo‘lga qo‘yishda yordam beramiz: xodimlar uchun muntazam qabul, ochiq konsultatsiya kunlari, anonim murojaatlar va HR-jamoani kuzatib borish.",
                    note:
                        "Yirik kompaniyalar va oyiga 12 sessiyadan boshlab maxsus korporativ tariflar amal qiladi. Tafsilotlar arizangiz ko‘rib chiqilgach taqdim etiladi.",
                },
            },
            psyPage: {
                hero: {
                    badge: "psixologlar uchun masofaviy ish",
                    titleLine1: "Amaliyotchi psixologlar uchun",
                    titleLine2: "platforma",
                    text:
                        "Biz mijozlar, tashkiliy ishlar va texnikani o‘z zimmamizga olamiz, siz esa eng yaxshi biladigan ish – odamlarni qo‘llab-quvvatlash bilan shug‘ullanasiz. Shaffof shartlar, qulay onlayn-servis va siz bilan maslahatlashadigan jamoa.",
                    imageAlt: "Kofe piyolasi bilan psixolog",
                },
                cta: {
                    button: "Hamkorlikni boshlash",
                },
                stats: {
                    psychologists: {
                        label: "Jamoamizdagi psixologlar",
                        note: "platformaga qo‘shilgan",
                    },
                    retention: {
                        label: "Mutaxassislar qolishi",
                        note: "bir yildan ortiq biz bilan ishlaydi",
                    },
                    match: {
                        label: "«O‘z» psixologini topgan mijozlar",
                        note: "fikr-mulohazalar va qayta sessiyalar bo‘yicha",
                    },
                    sessions: {
                        label: "O‘tkazilgan sessiyalar",
                        note: "bizning platformada",
                    },
                    since: {
                        value: "2025 yildan beri",
                        label: "Bozordamiz",
                        note: "psixologik yordamni ommaga yaqinlashtiramiz",
                    },
                },
                accordion: {
                    title: "Siz psixoterapiya qilasiz, biz — tashkiliy ishlarni",
                    subtitle:
                        "Barqaror mijozlar oqimini va resursingizga mos ish rejimini yo‘lga qo‘yishda yordam beramiz.",
                    items: {
                        traffic: {
                            title:
                                "Mijoz qayerdan keladi deb o‘ylamaysiz — oqimni biz olib kelamiz",
                            text:
                                "Marketing va so‘rovlar oqimini biz olib boramiz: platforma mijozlarga sizni so‘rov, tajriba va yo‘nalish bo‘yicha topishga yordam beradi.",
                        },
                        operations: {
                            title:
                                "Yozilish, eslatmalar va to‘lovni biz boshqaramiz",
                            text:
                                "Yozilish, eslatmalar va onlayn-to‘lov tizimi Yordam orqali ishlaydi. Sizga hamma narsani daftar yoki xotirada ushlab turish shart emas.",
                        },
                        format: {
                            title:
                                "Istalgan joydan o‘zingizga qulay formatda ishlaysiz",
                            text:
                                "Formatni o‘zingiz tanlaysiz: video, audio yoki chat. Muhimi – barqaror internet va mos ish jadvali.",
                        },
                        brand: {
                            title:
                                "Shaxsiy brend va profilni rivojlantirishda yordam beramiz",
                            text:
                                "Profilni chiroyli rasmiylashtirish, fikr-mulohazalar to‘plash va agressiv reklamasiz professional imidjingizni rivojlantirishda ko‘maklashamiz.",
                        },
                        schedule: {
                            title:
                                "Sizga mos kun va soatlarda ishlaysiz",
                            text:
                                "Jadval va sessiyalar sonini o‘zingiz belgilaysiz. Platforma sizning resursingizga moslashadi, aksincha emas.",
                        },
                        support: {
                            title:
                                "Yolg‘iz qolmasligingiz uchun qo‘llab-quvvatlaymiz",
                            text:
                                "Ko‘mak jamoasi va boshqa mutaxassislar — ishdagi qiyinchiliklarni muhokama qilish va hammasini yolg‘iz ko‘tarmaslik uchun maydon.",
                        },
                    },
                },
                calculator: {
                    title: "Yordam bilan qancha daromad olishingiz mumkin",
                    subtitle:
                        "Taxminiy hisob. Haqiqiy daromad sessiyalar soni va tanlangan tarifga bog‘liq.",
                    sessionsPerDay: "Kunda sessiyalar soni",
                    daysPerWeek: "Haftasiga ish kunlari",
                    sessionsLabel: "Kuniga {{count}} ta sessiya",
                    daysLabel: "Haftasiga {{count}} kun",
                    notePrefix: "Hisobda taxminiy narxdan foydalanildi:",
                    noteSuffix:
                        "har bir sessiya uchun. Aniq raqamlar ish formati va tarifga qarab o‘zgaradi.",
                    incomeLabel: "Taxminiy daromad",
                    perMonth: "oyiga",
                    perYear: "yiliga",
                    footer:
                        "Bu tanlangan yuklama bo‘yicha taxminiy qiymatlar. Biz barqaror mijozlar oqimini ushlab turishda yordam beramiz, shunda siz daromad va dam olishni rejalashtira olasiz.",
                },
                requirements: {
                    title: "Mutaxassislarga qo‘yiladigan talablar",
                    subtitle:
                        "Biz qadriyatlarimizni bo‘lishadigan, mijozlarga ehtiyotkor munosabatda bo‘ladigan va onlayn formatda rivojlanishga tayyor amaliyotchi psixologlar bilan ishlaymiz.",
                    items: {
                        education: {
                            title: "Ta’lim",
                            text:
                                "Psixologiya bo‘yicha oliy ma’lumot yoki psixologiya yo‘nalishida qayta tayyorlash diplomi.",
                        },
                        extraEducation: {
                            title: "Qo‘shimcha o‘qish",
                            text:
                                "Psixologik yondashuvlardan birida (masalan, KPT, geştalt-terapiya, psixoanaliz va boshqalar) tugallangan o‘quv dasturi.",
                        },
                        experience: {
                            title: "Amaliy tajriba",
                            text:
                                "Psixologik konsultatsiyalar o‘tkazish tajribasi kamida 2 yil: onlayn yoki offlayn, xususiy amaliyotda yoki tashkilotda.",
                        },
                        tech: {
                            title: "Texnik talablar",
                            text:
                                "Kompyuter yoki kamera va mikrofonli telefon, onlayn sessiyalar uchun barqaror internet.",
                        },
                        ethics: {
                            title: "Etika me’yorlari",
                            text:
                                "Kasbiy etika, maxfiylik va har bir mijozga hurmat bilan munosabatda bo‘lish qoidalariga qat’iy rioya qilish.",
                        },
                        legal: {
                            title: "Yuridik maqom",
                            text:
                                "O‘zbekiston Respublikasida yakka tartibdagi tadbirkor yoki yuridik shaxs maqomiga ega bo‘lish yoki uni rasmiylashtirishga tayyor bo‘lish.",
                        },
                    },
                },
            },
            influencersPage: {
                hero: {
                    badge: "Yordam bilan hamkorlik",
                    title: "Influencerlar va kontent mualliflari uchun",
                    text:
                        "Agar sizda auditoriya bo‘lsa va psixologik yordam qadriyatiga qo‘shilsangiz, biz hamkorlikni muhokama qilishga tayyormiz: maxsus loyihalar, integratsiyalar, promo-kodlar va boshqa formatlar."
                },
                blocks: {
                    why: {
                        title: "Bu sizga nima beradi",
                        text:
                            "• Hamkorlik dasturi orqali qo‘shimcha daromad.\n" +
                            "• Auditoriyangiz uchun foydali va qadri bor taklif.\n" +
                            "• Qo‘shma loyihalar, efirlar va maxsus kontent."
                    },
                    formats: {
                        title: "Hamkorlik formatlari",
                        text:
                            "• Video, stories va postlardagi integratsiyalar.\n" +
                            "• Shaxsiy promo-kodlar.\n" +
                            "• Marafonlar, challengelар, maxsus loyihalar."
                    },
                    who: {
                        title: "Kimlar uchun mos",
                        text:
                            "• Blogerlar va fikr yetakchilari.\n" +
                            "• Psixologiya, o‘zini rivojlantirish, sport, ta’lim va lifestyle yo‘nalishidagi mualliflar.\n" +
                            "• Ruhiy salomatlikni qadrlaydiganlar."
                    }
                },
                form: {
                    title: "Hamkorlik uchun ariza qoldiring",
                    subtitle:
                        "O‘zingiz va auditoriyangiz haqida qisqacha yozing — biz siz bilan bog‘lanamiz va hamkorlik formatini taklif qilamiz.",
                    fields: {
                        name: {
                            label: "Sizga qanday murojaat qilaylik?",
                            placeholder: "Ism yoki taxallus"
                        },
                        contact: {
                            label: "Aloqa uchun kontakt",
                            placeholder: "E-mail, Telegram yoki Instagram"
                        },
                        platform: {
                            label: "Platforma",
                            placeholder: "YouTube, Instagram, TikTok va hokazo"
                        },
                        audienceSize: {
                            label: "Auditoriya hajmi taxminan",
                            placeholder: "Masalan: 50 000 obunachi"
                        },
                        idea: {
                            label: "Hamkorlik g‘oyasi yoki formati",
                            placeholder: "Kutilmalar va integratsiya formatini qisqacha yozing."
                        }
                    },
                    submit: "Arizani yuborish"
                },
                support: {
                    title: "Servis rivojlanishini qo‘llab-quvvatlash",
                    text:
                        "Agar ruhiy salomatlik g‘oyasi sizga yaqin bo‘lsa, Yordam rivojlanishini qo‘llab-quvvatlashingiz mumkin. Sizning yordamingiz platformani rivojlantirish va yangi qo‘llab-quvvatlash formatlarini yaratishga yordam beradi.",
                    imageAlt: "Qo‘llab-quvvatlovchi iliq illyustratsiya",
                    button: "Servisni qo‘llab-quvvatlash",
                    footerText:
                        "Hamkorlik bo‘yicha savollar uchun bizga " +
                        "partner@yordam.uz manziliga yoki Telegram orqali yozishingiz mumkin."
                },
                bottomNote:
                    "Biz hamkorlar va integratsiya formatlarini ehtiyotkorlik bilan tanlaymiz. Eng muhimi — foydalanuvchilarning ishonchini va servis sifatini saqlab qolish."
            },
            contactsPage: {
                hero: {
                    badge: "Yordam bilan aloqa",
                    title: "Yordam bilan qanday bog‘lanish mumkin",
                    text:
                        "Agar sizda servis ishlashi, hamkorlik yoki psixologga yozilish bo‘yicha savollar bo‘lsa — sizga qulay aloqa usulini tanlang. Ilk imkoniyatda javob berishga harakat qilamiz."
                },
                main: {
                    title: "Asosiy kontaktlar",
                    phone: {
                        label: "Telefon",
                        number: "+998 90 000 00 00",
                        note: "Servis bo‘yicha savollar va psixologga yozilish uchun"
                    },
                    support: {
                        label: "Texnik qo‘llab-quvvatlash",
                        note: "Kabinetga kirish, to‘lovlar va texnik savollar uchun"
                    },
                    partners: {
                        label: "Hamkorlar uchun",
                        note: "Kompaniyalar, influencerlar, HR va ta’lim loyihalari uchun"
                    },
                    messengers: {
                        label: "Messengerlar",
                        note:
                            "Sizga qulay bo‘lgan messenjerga yozing, odatda kun davomida javob beramiz"
                    }
                },
                sideCard: {
                    title: "Biz doimo aloqadamiz",
                    text:
                        "Agar qaysi kontaktga yozishni bilmasangiz, yuqoridagi istalgan aloqa usulini tanlang — sizni kerakli mutaxassisga yo‘naltiramiz.",
                    imageAlt: "Kontaktlar bo‘limi uchun tasvir",
                    bottomNote:
                        "Iltimos, favqulodda tibbiy yordam yoki zudlik bilan aralashuvni talab qiladigan holatlarda texnik qo‘llab-quvvatlashga yozmang. Bunday vaziyatlarda shoshilinch xizmatlarga murojaat qiling."
                },
                map: {
                    title: "Biz xaritada",
                    subtitle: "Samarqand, Yordam servisining ofisi yoki mavjudlik nuqtasi."
                }
            },
            landing: {
                hero: {
                    titleMain: "Psixologik yordam,",
                    titleAccent: "onlayn",
                    subtitle:
                        "Tekshirilgan mutaxassislar bilan onlayn konsultatsiyalar. Oddiy. Qulay. Ishonchli.",
                    button: "Psixolog topish",
                    priceLabel: "200 000 so'mdan"
                },
                help: {
                    titleMain: "Biz sizga qanday",
                    titleAccent: "yordam beramiz",
                    text:
                        "Yordam psixologlari tashvish, munosabatlar, inqirozlar va murakkab hayotiy vaziyatlar bilan ishlashga yordam beradi. " +
                        "Quyida murojaat qilish mumkin bo'lgan sohalarning faqat bir qismi keltirilgan.",
                    cards: {
                        anxiety: {
                            title: "Tashvish va stressni kamaytirish",
                            text:
                                "Psixolog bilan birgalikda siz his-tuyg'ularingizni yaxshiroq tushunishni, " +
                                "vahima, zo'riqish va doimiy tashvish holatini yengishni o'rganasiz."
                        },
                        kids: {
                            title: "Bola yoki o‘smirni qo‘llab-quvvatlash",
                            text:
                                "Mutaxassislar bolalar va o‘smirlarga qo‘rquvlar, bosim, bullying, maktabni almashtirish " +
                                "va ular uchun muhim bo‘lgan boshqa holatlar bilan kurashishda yordam beradi."
                        },
                        relationships: {
                            title: "Oila va munosabatlarni yaxshilash",
                            text:
                                "Mojorolarni tahlil qilish, his-tuyg'ular haqida gapirish, chegaralar qo'yish va " +
                                "doimiy janjalsiz bir-birini eshitishni o'rganish mumkin."
                        },
                        loss: {
                            title: "Ajralish yoki yo‘qotishni yengib o‘tish",
                            text:
                                "Psixolog yo‘qotish davrida ehtiyotkorlik bilan qo‘llab-quvvatlaydi, kuchli his-tuyg'ularni boshdan kechirishga, " +
                                "aybdorlik hissini kamaytirishga va hayotni asta-sekin qayta yig'ishga yordam beradi."
                        }
                    }
                },
                howItWorks: {
                    title: "Bu qanday ishlaydi",
                    subtitle:
                        "Ichki muvozanat sari yo‘lingizni bir necha oddiy qadamdan boshlang. " +
                        "Biz jarayonni imkon qadar tushunarli va qulay qildik.",
                    steps: {
                        step1: {
                            title: "So‘rovnomani to‘ldiring",
                            text:
                                "O‘zingiz haqingizda bir nechta savollarga javob bering, shunda biz sizga tezroq mos psixologni topishga yordam bera olamiz."
                        },
                        step2: {
                            title: "Psixologni tanlang",
                            text:
                                "Biz sizga mos mutaxassislarni ko‘rsatamiz, siz esa ular orasidan kim bilan ishlashni xohlashingizni tanlaysiz."
                        },
                        step3: {
                            title: "Sanasini bron qiling",
                            text:
                                "Qulay vaqt va sessiya formatini tanlang. Hammasi onlayn, psixolog esa doim yoningizda."
                        },
                        step4: {
                            title: "Sessiyani boshlang",
                            text:
                                "Birinchi sessiyada psixolog bilan tanishib chiqasiz va u bilan davom etish sizga qay darajada qulayligini his qilasiz."
                        }
                    },
                    cta: "Hozirdan boshlab ko‘rish"
                },
                verified: {
                    title: "Faqat tekshirilgan va saralangan mutaxassislar",
                    text:
                        "Platformaga faqat profil ma’lumotga ega va tajribasi tekshirilgan mutaxassislar qabul qilinadi. " +
                        "Biz psixologlarni qo‘lda saralaymiz va ish sifatini nazorat qilamiz.",
                    button: "Psixolog topish"
                }
            },
            psychologistsList: {
                title: "Mutaxassis qidirish",
                breadcrumbs: {
                    home: "Bosh sahifa",
                    current: "Mutaxassis tanlash",
                },
                search: {
                    placeholder: "Ism, yo‘nalish, so‘rov…",
                },
                found: {
                    prefix: "Topildi",
                    suffix: "nafar mutaxassis",
                },
                sort: {
                    popular: "Eng ko‘p ko‘rilganlar",
                    verified: "Tekshirilganlar",
                    new: "Yangi mutaxassislar",
                },
                filters: {
                    title: "Filtrlar",
                    reset: "Tozalash",
                    common: {
                        any: "Har qanday",
                    },
                    therapyType: {
                        label: "Terapiya turi",
                    },
                    approach: {
                        label: "Psixologik yondashuv",
                    },
                    experience: {
                        label: "Amaliyot tajribasi",
                        from1: "1 yildan boshlab",
                        from3: "3 yildan boshlab",
                        from5: "5 yildan boshlab",
                    },
                    time: {
                        label: "Sessiya vaqti",
                        anyTime: "Har qanday vaqt",
                    },
                    language: {
                        label: "Maslahat tili",
                    },
                },
                messages: {
                    loadingFilters: "Filtrlar yuklanmoqda…",
                    loadingList: "Mutaxassislar ro‘yxati yuklanmoqda…",
                    empty:
                        "Sizning so‘rovingiz bo‘yicha hozircha hech narsa topilmadi. Filtrlarni yoki so‘rovni o‘zgartirib ko‘ring.",
                    loadError: "Maʼlumotlarni yuklashda xatolik",
                    errorPrefix: "Xatolik:",
                },
                loadMore: "Yana ko‘rsatish",
            },
            psychDetail: {
                loading: "Mutaxassis yuklanmoqda...",
                notFound: {
                  text: "Mutaxassis topilmadi.",
                  backLink: "Ro‘yxatga qaytish",
                },
                error: {
                  prefix: "Xatolik:",
                  backLink: "Ro‘yxatga qaytish",
                },
                breadcrumbs: {
                  home: "Bosh sahifa",
                  list: "Mutaxassis tanlash",
                },
                title: "Mutaxassis sahifasi",
                buttons: {
                  book: "Vaqt band qilish",
                  favoriteAdd: "Sevimlilarga qo‘shish",
                  favoriteIn: "Sevimlilarda",
                },
                header: {
                  verified: "Yordam tomonidan tasdiqlangan",
                  notVerified: "Yordam mutaxassisi",
                  age: "{{age}} yosh",
                  ageNotSpecified: "Yoshi ko‘rsatilmagan",
                  experience: "Tajriba {{years}} yil",
                  experienceNotSpecified: "Tajriba ko‘rsatilmagan",
                  pricePerHour: "{{price}} {{currency}}/soat",
                  priceTBD: "Narx aniqlashtiriladi",
                  priceNote: "Sessiya narxi",
                },
                about: {
                  title: "Men haqimda",
                  fallback:
                    "Mutaxassis tavsifi keyinroq qo‘shiladi. Bu yerda siz o‘zingizning yondashuvingiz, tajribangiz va ishlayotgan mavzularingiz haqida yozishingiz mumkin.",
                },
                approach: {
                  title: "Ishdagi psixologik yondashuv",
                },
                education: {
                  title: "Ta’lim",
                  empty: "Ta’lim haqida ma’lumot keyinroq qo‘shiladi.",
                  documentLink: "Hujjatga havola →",
                },
                certificates: {
                  title: "Sertifikatlar",
                  empty: "Sertifikatlar haqida ma’lumot keyinroq qo‘shiladi.",
                  issued: "Berilgan sana: {{date}}",
                  validUntil: "Amal qilish muddati: {{date}}",
                  documentLink: "Hujjatga havola →",
                },
                reviews: {
                  title: "Fikrlar",
                  items: {
                    r1: {
                      text:
                        "Servis o‘zimga mos mutaxassis topishga yordam berdi. Sayt qulay, sessiyaga yozilish bir necha bosqichda.",
                      role: "Yordam servisi mijozı",
                    },
                    r2: {
                      text:
                        "Onlayn terapiya menga mos keladi deb o‘ylamagan edim. Lekin sizning psixologingiz bilan ishonchli aloqa o‘rnatildi.",
                      role: "Yordam servisi mijozasi",
                    },
                    r3: {
                      text:
                        "Sessiya eslatmalari o‘z vaqtida kelishi yoqadi, to‘lov va hujjatlarni bitta joyda saqlash juda qulay.",
                      role: "Yordam servisi mijozı",
                    },
                    r4: {
                      text:
                        "Aynan mening so‘rovimni tushunadigan mutaxassisni topdim. Format ham, interfeys ham juda qulay.",
                      role: "Yordam servisi mijozasi",
                    },
                  },
                },
            }
              
            






        },
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "ru",
        supportedLngs: ["ru", "uz"],
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
