## Converts a restructured text file (.rst) to markdown (.md).
## You have to install pandoc before using it. [https://pandoc.org/]

FILES=*.rst
for f in $FILES
do
  filename="${f%.*}"
  echo "Converting $f to $filename.md"
  `pandoc $f -f rst -t markdown -o $filename.md`
done
