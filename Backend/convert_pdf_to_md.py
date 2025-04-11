import os
import pdfplumber

# Input PDF file path and output directory
pdf_path = "./data/pdf/Laws of the Game 2024_25.pdf"  # Replace with your PDF file path
output_dir = "./data/soccer_referee_rules/"           # Directory for Markdown files

# Ensure the output directory exists
os.makedirs(output_dir, exist_ok=True)

try:
    # Open the PDF file
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages):
            text = page.extract_text()
            if text:
                # Create a separate Markdown file for each page
                md_file_path = os.path.join(output_dir, f"page_{i + 1}.md")
                with open(md_file_path, "w", encoding="utf-8") as md_file:
                    md_file.write(f"# Page {i + 1}\n\n")
                    md_file.write(text.strip())
                    md_file.write("\n")
                print(f"Page {i + 1} processed and saved to {md_file_path}")
            else:
                print(f"Page {i + 1} has no text and was skipped.")
except FileNotFoundError:
    print(f"Error: File not found at {pdf_path}")
except Exception as e:
    print(f"An error occurred: {e}")