function main() {

}

main().catch((e) => {
    console.log(e);
    process.exit(1)
}).finally(() => prisma.$disconnect())