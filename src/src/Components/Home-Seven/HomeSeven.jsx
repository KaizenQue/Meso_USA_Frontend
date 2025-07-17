import React, { useState } from 'react';

const HomeSeven = () => {
    // Categories list
    const categories = [
        { id: 'law', name: 'LAW', active: false },
        { id: 'finance', name: 'FINANCE & COMPENSATION', active: false },
        { id: 'process', name: 'PROCESS RELATED', active: false },
        { id: 'fightForMeso', name: 'FIGHTFORMESO', active: false }
    ];

    // FAQ questions and answers
    const faqItems = [
        {
            id: 1,
            question: 'Am I eligible to file a Mesothelioma lawsuit?',
            answer: 'Yes, you may be eligible to file a mesothelioma lawsuit if you were diagnosed with mesothelioma due to asbestos exposure. Eligibility depends on factors like work history, exposure source, and state laws. Family members of deceased victims may also file a wrongful death claim.',
            category: 'law',
            expanded: false
        },
        {
            id: 3,
            question: 'What if my asbestos exposure happened decades ago?',
            answer: 'Since mesothelioma has a long latency period (20-50 years), you can still file a claim even if the exposure occurred decades ago. Courts recognize this delay, and the timeline usually starts from the date of diagnosis, not exposure.',
            category: 'law',
            expanded: false
        },
        {
            id: 2,
            question: 'How long do I have to file a claim after my diagnosis?',
            answer: 'The time limit to file a claim varies by state and is determined by the statute of limitations—typically 1 to 5 years from the date of diagnosis. It’s crucial to consult a lawyer quickly to ensure you meet the deadline.',
            category: 'law',
            expanded: true
        },
        {
            id: 4,
            question: 'Can I still file a lawsuit if I dont know where I was exposed to asbestos?',
            answer: 'You may still file a lawsuit even if you’re unsure of where the exposure occurred. Experienced mesothelioma attorneys can investigate your work history, living environments, and product usage to identify possible asbestos sources.',
            category: 'law',
            expanded: false
        },
        {
            id: 6,
            question: 'What if my asbestos exposure happened decades ago?',
            answer: 'Most mesothelioma cases develop 20-50 years after asbestos exposure. The law recognizes this long latency period, and the statute of limitations typically begins when you are diagnosed, not when exposure occurred.',
            category: 'law',
            expanded: false
        },
        {
            id: 5,
            question: 'Is my family eligible to file a lawsuit on my behalf?',
            answer: 'Yes, if you cannot file a lawsuit due to illness, a spouse, child, or legal representative can file on your behalf. If a loved one has passed away due to mesothelioma, family members may also file a wrongful death claim to seek compensation.',
            category: 'law',
            expanded: true

        },
        {
            id: 7,
            question: 'Can I file a claim if I was exposed to asbestos secondhand?',
            answer: 'Yes, secondhand exposure victims—such as family members of workers who unknowingly brought asbestos fibers home on their clothing—can file a claim. Many cases have been successfully pursued for individuals who developed mesothelioma through household exposure.',
            category: 'law',
            expanded: true

        },
        {
            id: 8,
            question: ' How much compensation can I receive for my case?',
            answer: 'Mesothelioma settlements average $1M–$1.4M, while trial verdicts can exceed $20M depending on case specifics.',
            category: 'finance',
            expanded: true
        },
        {
            id: 9,
            question: ' Are there Mesothelioma trust funds available for me?',
            answer: 'Yes, asbestos trust funds hold over $30B for victims. Eligibility depends on exposure history and diagnosis.',
            category: 'finance',
            expanded: true
        },
        {
            id: 10,
            question: ' Can I still get compensation if I already receive VA or Social Security benefits?',
            answer: 'Yes, legal claims and trust funds do not impact VA or Social Security benefits.',
            category: 'finance',
            expanded: true
        },
        {
            id: 11,
            question: ' How is compensation calculated for Mesothelioma cases?',
            answer: 'It’s based on medical costs, lost wages, pain and suffering, and negligence of responsible parties.',
            category: 'finance',
            expanded: true
        },
        {
            id: 12,
            question: ' Will filing a claim affect my existing health insurance or retirement benefits?',
            answer: 'No, mesothelioma claims typically do not impact health insurance or retirement benefits.',
            category: 'finance',
            expanded: true
        },
        {
            id: 23,
            question: 'Can my family receive compensation if I pass away during the lawsuit?',
            answer: 'Yes, families can continue the lawsuit or file a wrongful death claim for compensation.',
            category: 'finance',
            expanded: true
        }
        ,
        {
            id: 13,
            question: ' How long does a Mesothelioma lawsuit take?',
            answer: 'Mesothelioma lawsuits vary in how long they take from start to finish. The length of these lawsuits is determined by many factors. It may take as little as 90 days depending on the complexity of the case.',
            category: 'process',
            expanded: true
        }
        ,
        {
            id: 14,
            question: ' Will I need to go to court?',
            answer: 'No, you do not need to attend a court session. The lawyer along with a set of documents that prove you have been diagnosed with Mesothelioma will take care of it.',
            category: 'process',
            expanded: true
        }
        ,
        {
            id: 15,
            question: 'What if the company responsible is no longer in business?',
            answer: 'Yes, in many cases victims of mesothelioma can still pursue legal remedies even if a business has closed or filed for bankruptcy',
            category: 'process',
            expanded: true
        }
        ,
        {
            id: 16,
            question: ' Do I need to provide medical records or proof of the diagnosis?',
            answer: 'Yes, it is necessary to have a set of documents ready while filling out the claim form.',
            category: 'process',
            expanded: true
        }
        ,
        {
            id: 25,
            question: 'How can I track the progress of my case?',
            answer: 'You can fill a form with basic details and our executive will get back to you soon.',
            category: 'process',
            expanded: true
        }
        // ,
        // {
        //     id: 26,
        //     question: ' What happens if my case is not successful?',
        //     answer: '',
        //     category: 'process',
        //     expanded: true
        // }
        ,
        {
            id: 17,
            question: ' What does ‘No Win, No Fee’ mean for me?',
            answer: 'NO WIN NO FEE suggests not paying anything until you win. If you lose the trial, the case is considered free.',
            category: 'fightForMeso',
            expanded: true
        }
        ,
        {
            id: 18,
            question: ' Do I have to pay anything upfront?',
            answer: 'No, there is no upfront fee.',
            category: 'fightForMeso',
            expanded: true
        }
        ,
        {
            id: 19,
            question: ' Are there hidden costs if I win my case?',
            answer: 'There are no hidden costs involved in any of the Mesothelioma cases.',
            category: 'fightForMeso',
            expanded: true
        }
        ,
        {
            id: 20,
            question: 'How does your law firm determine if I have a strong case?',
            answer: 'Law firms request documents and health reports to assess the strength of your case before proceeding.',
            category: 'fightForMeso',
            expanded: true
        }
        // ,
        // {
        //     id: 21,
        //     question: ' Can I switch lawyers if I’m not happy with my current legal representation?',
        //     answer: '',
        //     category: 'fightForMeso',
        //     expanded: true
        // }
        ,
        {
            id: 22,
            question: 'How soon will I receive compensation after a successful claim?',
            answer: 'Court case compensation varies by jurisdiction but may take up to a year, while asbestos trust claims can be paid out within three months.',
            category: 'fightForMeso',
            expanded: true
        }

    ];

    // State management
    const [selectedCategory, setSelectedCategory] = useState('law');
    const [expandedItems, setExpandedItems] = useState(
        faqItems.reduce((acc, item) => {
            acc[item.id] = false; // Set all to false initially to collapse all items
            return acc;
        }, {})
    );

    // Toggle FAQ item expansion
    const toggleItem = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Handle category selection
    const handleCategoryChange = (categoryId) => {
        if (selectedCategory === categoryId) {
            setSelectedCategory(null); // Unselect if clicking the same category
        } else {
            setSelectedCategory(categoryId); // Select new category
        }
    };

    // Filter FAQ items by selected category or show all if none selected
    const filteredItems = selectedCategory
        ? faqItems.filter(item => item.category === selectedCategory)
        : faqItems;

    return (
        <div>
            <section className="py-1 bg-[#FAF3EC] font-sans hidden lg:block">
                <div className="max-w-8xl m-32">
                    <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[#4B2C5E] mb-10 leading-tight">
                        FAQS
                    </h2>
                    <div className="flex flex-col lg:flex-row gap-10">
                        <div className="lg:w-1/3">
                            <fieldset className="space-y-2 sticky top-20 mt-16">
                                <div className="flex flex-col gap-4">
                                    {categories.map(category => (
                                        <div key={category.id} className="flex items-center">
                                            <input
                                                id={`category-${category.id}`}
                                                name="category-group"
                                                type="checkbox"
                                                checked={selectedCategory === category.id}
                                                onChange={() => handleCategoryChange(category.id)}
                                                className={`h-8 w-8 rounded border-2 ${selectedCategory === category.id ? 'border-[#4B2C5E] bg-[#4B2C5E]' : 'bg-[#B8B8B8]'} text-[#4B2C5E] focus:ring-[#4B2C5E] appearance-none`}
                                            />
                                            <label
                                                htmlFor={`category-${category.id}`}
                                                className={`ml-3 text-[#4B2C5E] font-helvetica text-[20px] font-bold uppercase leading-none`}
                                            >
                                                {category.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                        </div>

                        <div className="lg:w-3/4">
                            <div className="bg-white rounded-2xl p-10 shadow-lg relative overflow-hidden">
                                <div className="absolute inset-0 bg-orange-100 opacity-15 pointer-events-none z-0"></div>

                                <div className="relative z-10">
                                    {filteredItems.length > 0 ? (
                                        filteredItems.map((item, index) => (
                                            <div
                                                key={item.id}
                                                className={`py-2 ${expandedItems[item.id] ? 'expanded' : ''}`}
                                            >
                                                {index > 0 && <div className="h-px bg-[#4B2C5E] my-3 md:my-8"></div>}
                                                <div
                                                    className="flex items-center cursor-pointer"
                                                    onClick={() => toggleItem(item.id)}
                                                >
                                                    <button
                                                        className={`w-8 h-8 flex-shrink-0 p-0 mr-4 relative transition-transform duration-300 ${expandedItems[item.id] ? 'rotate-0' : ''}`}
                                                        aria-label="Toggle answer"
                                                    >
                                                        <div className="relative w-6 h-6 block">
                                                            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-6 bg-amber-600 transition-opacity duration-300" style={{ opacity: expandedItems[item.id] ? 0 : 1 }}></span>
                                                            <span className="absolute top-1/2 left-0 -translate-y-1/2 w-6 h-1 bg-amber-600"></span>
                                                        </div>
                                                    </button>
                                                    <h3 className="text-2xl md:text-3xl font-bold text-[#4B2C5E] flex-1">
                                                        {item.question}
                                                    </h3>
                                                </div>
                                                {expandedItems[item.id] && (
                                                    <div className="pt-5 pl-12 animate-fadeIn">
                                                        <p className="text-xl text-[#4B2C5E] leading-relaxed">
                                                            {item.answer}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-10 text-center">
                                            <p className="text-xl text-gray-500">No questions found for this category.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="block md:hidden py-4 bg-[#FAF3EC] font-sans px-4">
                <div className="max-w-full mx-auto">
                    <h2 className="text-4xl font-serif font-bold text-[#4B2C5E] mb-6 leading-tight">
                        FAQS
                    </h2>

                    {/* Mobile Categories - Horizontal Scroll */}
                    <div className="lg:hidden mb-6 overflow-x-auto">
                        <div className="flex space-x-4 pb-2">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryChange(category.id)}
                                    className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold uppercase ${selectedCategory === category.id ? 'bg-[#4B2C5E] text-white' : 'bg-white text-[#4B2C5E] border border-[#4B2C5E]'}`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* FAQ Items */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <div key={item.id} className={`py-3 ${index > 0 ? 'border-t border-[#4B2C5E]' : ''}`}>
                                    <div
                                        className="flex items-start cursor-pointer"
                                        onClick={() => toggleItem(item.id)}
                                    >
                                        <button
                                            className={`w-6 h-6 flex-shrink-0 p-0 mr-3 mt-1`}
                                            aria-label="Toggle answer"
                                        >
                                            <div className="relative w-5 h-5 block">
                                                <span className={`absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-5 bg-amber-600 transition-opacity duration-300 ${expandedItems[item.id] ? 'opacity-0' : 'opacity-100'}`}></span>
                                                <span className="absolute top-1/2 left-0 -translate-y-1/2 w-5 h-0.5 bg-amber-600"></span>
                                            </div>
                                        </button>
                                        <h3 className="text-lg font-bold text-[#4B2C5E] flex-1">
                                            {item.question}
                                        </h3>
                                    </div>
                                    {expandedItems[item.id] && (
                                        <div className="pt-3 pl-9 animate-fadeIn">
                                            <p className="text-base text-[#4B2C5E] leading-relaxed">
                                                {item.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="py-6 text-center">
                                <p className="text-base text-gray-500">No questions found for this category.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeSeven;