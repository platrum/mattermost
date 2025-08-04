#!/bin/bash

# Скрипт для локализации JSON файлов
# Заменяет Mattermost на Platrum и обновляет домены

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Начинаем локализацию JSON файлов...${NC}"

# Получаем директорию скрипта
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Счетчик обработанных файлов
count=0

# Проходим по всем JSON файлам в текущей директории
for file in "${SCRIPT_DIR}"/*.json; do
    if [[ -f "$file" ]]; then
        echo -e "${YELLOW}Обрабатываем: $(basename "$file")${NC}"

        # Создаем временный файл
        temp_file=$(mktemp)

        # Выполняем замены с помощью sed
        sed \
            -e 's/Mattermost/Platrum/g' \
            -e 's/mattermost\.com/platrum.com/g' \
            -e 's/mattermost\.org/platrum.com/g' \
            "$file" > "$temp_file"

        # Проверяем, что временный файл создан успешно
        if [[ $? -eq 0 ]]; then
            # Заменяем оригинальный файл
            mv "$temp_file" "$file"
            ((count++))
            echo -e "  ${GREEN}✓ Обработан${NC}"
        else
            echo -e "  ${RED}✗ Ошибка при обработке${NC}"
            rm -f "$temp_file"
        fi
    fi
done

echo -e "${GREEN}Локализация завершена!${NC}"
echo -e "${GREEN}Обработано файлов: $count${NC}"

# Показываем примеры изменений
echo -e "\n${YELLOW}Примеры произведенных замен:${NC}"
echo "Mattermost → Platrum"
echo "mattermost.com → platrum.com"
echo "mattermost.org → platrum.com"
