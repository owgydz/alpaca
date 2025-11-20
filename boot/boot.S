
.section .multiboot
.align 8
.long 0xE85250D6  
.long 0x0         
.long ( - (0xE85250D6 + 0x0) ) 

.text
.global _start
_start:
    mov $litz, %rax
    jmp *%rax
