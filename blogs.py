import os
import shutil
import argparse

def create_blog(blog_name):
    blog_dir = os.path.join(os.getcwd(), blog_name)
    if os.path.exists(blog_dir):
        print(f"{blog_name} already exists")
    else:
        template_dir = os.path.join(os.getcwd(), "Blog_name")
        shutil.copytree(template_dir, blog_dir)
        print(f"Created new blog: {blog_name}")
        
        # Remove the 'pytest_' prefix from the blog name
        if blog_name.startswith('pytest_'):
            blog_name = blog_name[7:]
        
        with open('.gitignore', 'a') as gitignore:
            gitignore.write(f"{blog_name}/\n")

def list_blogs():
    blogs = [d for d in os.listdir() if os.path.isdir(d) and d != "Blog_name" and not d.startswith('.')]
    if blogs:
        print("List of blogs:")
        for blog in blogs:
            print(f"- {blog}")
    else:
        print("No blogs found.")

def manage_git(blog_name):
    blog_dir = os.path.join(os.getcwd(), blog_name)
    if not os.path.exists(blog_dir):
        print(f"No blog found with name: {blog_name}")
    else:
        gitignore_path = os.path.join(os.getcwd(), '.gitignore')
        if os.path.exists(gitignore_path):
            with open(gitignore_path, 'r+') as gitignore:
                lines = gitignore.readlines()
                if f"{blog_name}/\n" in lines:
                    lines.remove(f"{blog_name}/\n")
                    gitignore.seek(0)
                    gitignore.writelines(lines)
                    gitignore.truncate()
                    print(f"Removed {blog_name} from .gitignore")
                else:
                    print(f"{blog_name} is not in .gitignore")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Blog management tool")
    parser.add_argument("-n", "--new", help="Create a new blog")
    parser.add_argument("-l", "--list", action="store_true", help="List all blogs")
    parser.add_argument("-git", help="Manage .gitignore for a blog")
    args = parser.parse_args()

    if args.new:
        create_blog(args.new)
    elif args.list:
        list_blogs()
    elif args.git:
        manage_git(args.git)
    else:
        parser.print_help()