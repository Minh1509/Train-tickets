export function normalizeStringForComparison(name: string): string {
    return name
        .normalize('NFKC') // Chuẩn hóa Unicode
        .toLowerCase()
        .trim() // Loại bỏ khoảng trắng đầu và cuối
        .replace(/\s+/g, ' '); // Thay thế nhiều khoảng trắng bằng một khoảng trắng duy nhất
}

export function normalizeStringForDatabase(name: string): string {
    return name
        .normalize('NFKC') // Chuẩn hóa Unicode
        .toLowerCase()
        .trim() // Loại bỏ khoảng trắng đầu và cuối
        .replace(/\s+/g, ' ') // Xóa khoảng trắng dư thừa ở giữa
        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase()); // Viết hoa chữ cái đầu của mỗi từ
}
