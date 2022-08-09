## steps

[pavyzdys](https://inspirothemes.com/polo/index.html)

### index.html

1. gaunam visus posts
2. sukurti navigacija home, add post
3. atvaizduoti visus posts
   3.1 viename poste atvaizduosim: title, tags, reactions

### add-post.html

1. suskuti add-post.html puslapi
2. prisideti helperi ir jam skirta js faila
3. dinamiskai prideti navigacija navigacija
4. forma sukurti naujam postui

### one post generation

1. sukursiu html
2. sustilizuosiu
3. kursiu html dinamiskai pagal [1] pavyzdi (generatePost)
4. generuosiu visus postus su funkcija (generatePostList)
5. prideti query parametra i single-post.html nuoroda

### single-post.html

1. navigacija
2. issiimti id i query parametru
3. fetch post objekta is https://dummyjson.com/posts/<id>
4. sudedam to post informacija
