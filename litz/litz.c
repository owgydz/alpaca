typedef unsigned long size_t;
extern void litz();

volatile unsigned short *VGA = (unsigned short*)0xB8000;
static int cursor = 0;

static void putch(char c) {
    VGA[cursor++] = (unsigned short)((0x07 << 8) | c); // fuck me that took 2 hours to debug and idek if it works
}

static void puts(const char *s) {
    while(*s) putch(*s++);
}

void litz() {
    puts("Booting the litz kernel\n");
    for(;;) __asm__ volatile ("hlt");
}