import os

replacements = {
    "Financial Intelligence System for Comparative Analysis of Bitcoin, Gold, and the S&P 500 using Artificial Intelligence": "Financial Intelligence System for Comparative Analysis of Bitcoin, Gold, and the S&P 500 using Artificial Intelligence",
    "Financial Intelligence System for Comparative Analysis of Bitcoin, Gold, and the S&P 500 using Artificial Intelligence": "Financial Intelligence System for Comparative Analysis of Bitcoin, Gold, and the S&P 500 using Artificial Intelligence",
    "Financial Intelligence System for Comparative Analysis of Bitcoin, Gold, and the S&P 500 using Artificial Intelligence": "Financial Intelligence System for Comparative Analysis of Bitcoin, Gold, and the S&P 500 using Artificial Intelligence",
    "Financial Intelligence System for Comparative Analysis of Bitcoin, Gold, and the S&P 500 using Artificial Intelligence": "Financial Intelligence System for Comparative Analysis of Bitcoin, Gold, and the S&P 500 using Artificial Intelligence",
    "Financial Intelligence System for Comparative Analysis of Bitcoin, Gold, and the S&P 500 using Artificial Intelligence": "Financial Intelligence System for Comparative Analysis of Bitcoin, Gold, and the S&P 500 using Artificial Intelligence",
    "FINANCIAL INTELLIGENCE SYSTEM FOR COMPARATIVE ANALYSIS OF BITCOIN, GOLD, AND THE S&P 500 USING ARTIFICIAL INTELLIGENCE": "FINANCIAL INTELLIGENCE SYSTEM FOR COMPARATIVE ANALYSIS OF BITCOIN, GOLD, AND THE S&P 500 USING ARTIFICIAL INTELLIGENCE",
    "Financial Intelligence System for Comparative Analysis of Bitcoin, Gold, and the S&P 500 using Artificial Intelligence of Bitcoin · Gold · S&P 500\\nTime Series Modeling  |  Volatility Analysis  |  Portfolio Optimization": "Financial Intelligence System for Comparative Analysis of Bitcoin, Gold, and the S&P 500 using Artificial Intelligence",
    "🚀 Financial Intelligence System for Comparative Analysis of Bitcoin, Gold, and the S&P 500 using Artificial Intelligence": "🚀 Financial Intelligence System for Comparative Analysis of Bitcoin, Gold, and the S&P 500 using Artificial Intelligence",
    "Financial Intelligence System for Comparative Analysis of Bitcoin, Gold, and the S&P 500 using Artificial Intelligence": "Financial Intelligence System for Comparative Analysis of Bitcoin, Gold, and the S&P 500 using Artificial Intelligence",
    "Financial Intelligence System": "Financial Intelligence System",
}

def replace_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_content = content
        for old_str, new_str in replacements.items():
            content = content.replace(old_str, new_str)
            
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated: {filepath}")
    except Exception as e:
        print(f"Skipped {filepath}: {e}")

directory = '.'
for root, dirs, files in os.walk(directory):
    if '.git' in root or 'node_modules' in root:
        continue
    for file in files:
        if file.endswith(('.js', '.py', '.html', '.md', '.ipynb')):
            replace_in_file(os.path.join(root, file))
