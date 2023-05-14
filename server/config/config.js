module.exports = {
    FEATURES : process.env.FEATURES || ["SizeOfOptionalHeader","Characteristics",	"MajorLinkerVersion",	"MinorLinkerVersion",	"SizeOfCode",	"SizeOfInitializedData",	"SizeOfUninitializedData"	,"AddressOfEntryPoint"	,"BaseOfCode"	,"BaseOfData"	,"ImageBase"	,"SectionAlignment"	,"FileAlignment" ,"MajorOperatingSystemVersion"],
    PORT : process.env.PORT || 3000
}


